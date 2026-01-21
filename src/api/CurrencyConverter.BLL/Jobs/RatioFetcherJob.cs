using System;
using CurrencyConverter.API.Entities;
using CurrencyConverter.BLL.Service;
using CurrencyConverter.DAL.Entities;
using CurrencyConverter.DAL.Interfaces;
using Quartz;

namespace CurrencyConverter.BLL.Jobs;

public class RatioFetcherJob(
    IRatingApi ratingApi,
    ICurrencyRatioRepository currencyRatioRepository,
    ICurrencyConverterService service,
    ICurrencyRatesTimestampRepository timestampRepository,
    IRateFetchHistoryRepository rateFetchHistoryRepository)
    : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
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
                        Rate = decimal.TryParse(ratio.data.value, out parsedRate) ? parsedRate : 0
                    });
                }
                else
                {
                    currencyRatio.Rate = decimal.TryParse(ratio.data.value, out parsedRate) ? parsedRate : 0;

                }
                DateOnly today = DateOnly.FromDateTime(DateTime.Now);
                var lastRecordDate = rateFetchHistoryRepository.GetLastRecordDate();
                if (lastRecordDate.date != today)
                {
                    rateFetchHistoryRepository.Add(new CurrencyRateFetchHistory
                    {
                        date = today,
                    });

                    timestampRepository.Add(new CurrencyRatesTimestamp
                    {
                        Currencies = baseCurrency.Code + targetCurrency.Code,
                        Timestamp = $"{today.Year}-{today.Month}-{today.Day}",
                        Rate = decimal.TryParse(ratio.data.value, out parsedRate) ? parsedRate : 0
                    });
                }

                currencyRatioRepository.SaveChanges();
            }

        }
    }
}
