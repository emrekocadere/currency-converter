using System;
using System.Text.Json;
using CurrencyConverter.API.Entities;
using Quartz;

namespace CurrencyConverter.API.Jobs;

public class CurrencyRatesFetcherJob: IJob
{
    readonly private HttpClient _httpClient;
    readonly private IConfiguration _configuration;
    readonly private CurrencyConverterService _currencyConverterService;

        public CurrencyRatesFetcherJob(HttpClient httpClient,IConfiguration configuration,CurrencyConverterService currencyConverterService){
        _httpClient=httpClient;
        _configuration=configuration;
        _currencyConverterService=currencyConverterService;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        
        var currencyList = _currencyConverterService.GetCurrencies();
        _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]);
        foreach (var currency in currencyList)
        {

            using HttpResponseMessage response = await _httpClient.GetAsync(
            $"https://api.apilayer.com/currency_data/live?source={currency.Code}&currencies=EUR%2CJPY%2CGBP%2CAUD%2CCAD%2CCHF%2CUSD");
            var jsonResponse = await response.Content.ReadAsStringAsync();// bak buraya
            var apiLayerCurrencyData = JsonSerializer.Deserialize<GetCurrencyRatesResponse>(jsonResponse);
            List<CurrencyRatio> currencyRatioList = new List<CurrencyRatio>();
            foreach (var item in apiLayerCurrencyData.quotes)
            {
                currencyRatioList.Add(new CurrencyRatio
                {
                    Currencies = item.Key,
                    Rate = item.Value
                });
            }
            _currencyConverterService.SaveTheCurencyRatesToDb(currencyRatioList);
        }
    }
}
