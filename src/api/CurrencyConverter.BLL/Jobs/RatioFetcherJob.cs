using System;
using System.Globalization;
using CurrencyConverter.API.Entities;
using CurrencyConverter.BLL.Service;
using CurrencyConverter.DAL.Entities;
using CurrencyConverter.DAL.Interfaces;
using Microsoft.Extensions.Logging;
using Quartz;

namespace CurrencyConverter.BLL.Jobs;

public class RatioFetcherJob(
    IRatingApi ratingApi,
    ICurrencyRatioRepository currencyRatioRepository,
    ICurrencyConverterService service,
    ICurrencyRatesTimestampRepository timestampRepository,
    IRateFetchHistoryRepository rateFetchHistoryRepository,
    ILogger<RatioFetcherJob> logger)
    : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        try
        {
            logger.LogInformation("[{JobName}] Job started. Time: {ExecutionTime}", "RatioFetcherJob", DateTime.UtcNow);

            var currencies = service.GetCurrencies();
            decimal parsedRate;
            foreach (var baseCurrency in currencies.Value)
            {
                foreach (var targetCurrency in currencies.Value)
                {
                    if (baseCurrency.Id == targetCurrency.Id)
                    {
                        continue;
                    }

                    var ratio = await ratingApi.GetRatio(baseCurrency.Id, targetCurrency.Id);
                    var currencyRatio = currencyRatioRepository.FindByName(baseCurrency.Code + targetCurrency.Code);
                    if (currencyRatio == null)
                    {
                        currencyRatioRepository.Add(new CurrencyRatio
                        {
                            Currencies = baseCurrency.Code + targetCurrency.Code,
                            Rate = decimal.TryParse(ratio.data.value, NumberStyles.Any, CultureInfo.InvariantCulture,
                                out parsedRate)
                                ? parsedRate
                                : 0
                        });
                    }
                    else
                    {
                        currencyRatio.Rate = decimal.TryParse(ratio.data.value, NumberStyles.Any,
                            CultureInfo.InvariantCulture, out parsedRate)
                            ? parsedRate
                            : 0;
                    }

                    DateOnly today = DateOnly.FromDateTime(DateTime.Now);
                    var abc = rateFetchHistoryRepository.IsExist(today, baseCurrency.Code + targetCurrency.Code);
                    if (!abc)
                    {
                        rateFetchHistoryRepository.Add(new CurrencyRateFetchHistory
                        {
                            Currencies = baseCurrency.Code + targetCurrency.Code,
                            date = today
                        });

                        timestampRepository.Add(new CurrencyRatesTimestamp
                        {
                            Currencies = baseCurrency.Code + targetCurrency.Code,
                            Timestamp = today.ToString(),
                            Rate = decimal.TryParse(ratio.data.value, NumberStyles.Any, CultureInfo.InvariantCulture,
                                out parsedRate)
                                ? parsedRate
                                : 0
                        });
                    }

                    currencyRatioRepository.SaveChanges();
                }

                logger.LogInformation("[{JobName}] Job completed successfully. Time: {ExecutionTime}", "RatioFetcherJob", DateTime.UtcNow);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "[{JobName}] An error occurred while running the job. Time: {ExecutionTime}", "RatioFetcherJob", DateTime.UtcNow);
            throw;
        }
    }
}