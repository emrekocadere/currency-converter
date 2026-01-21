using System;
using System.Text.Json;
using CurrencyConverter.API.Entities;
using CurrencyConverter.BLL;
using CurrencyConverter.BLL.Service;
using CurrencyConverter.DAL.Interfaces;
using Microsoft.Extensions.Configuration;
using Quartz;

namespace CurrencyConverter.API.Jobs;

public class CurrencyRatesFetcherJob : IJob
{
    readonly private HttpClient _httpClient;
    readonly private IConfiguration _configuration;
    readonly private CurrencyConverterService _currencyConverterService;
    readonly private ICurrencyRepository _currencyRepository;
    ICurrencyDataApi _currencyDataApi;

    public CurrencyRatesFetcherJob(HttpClient httpClient, IConfiguration configuration, CurrencyConverterService currencyConverterService, ICurrencyRepository currencyRepository, ICurrencyDataApi currencyDataApi)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _currencyConverterService = currencyConverterService;
        _currencyRepository = currencyRepository;
        _currencyDataApi = currencyDataApi;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        // var result = _currencyConverterService.GetCurrencies();

        // var currencyCodes = result.Value!.Select(c => c.Code).ToList();
        // var currenciesParam = string.Join(",", currencyCodes);

        // _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]);
        // foreach (var currency in currencyCodes!)
        // {
        //     var queryParams = new QueryParamss
        //     {
        //         source = currency,
        //         currencies = currenciesParam,
        //     };
        //     var abc = await _currencyDataApi.GetNewsAsync(_configuration["ApiKey:CurrencyDataApi"]!, queryParams);
        //     List<CurrencyRatio> currencyRatioList = new List<CurrencyRatio>();
        //     foreach (var item in abc.quotes!)
        //     {
        //         currencyRatioList.Add(new CurrencyRatio
        //         {
        //             Currencies = item.Key,
        //             Rate = item.Value
        //         });
        //     }
        //     _currencyConverterService.SaveTheCurencyRatesToDb(currencyRatioList);
        // }
    }
}




//   using HttpResponseMessage response = await _httpClient.GetAsync(
//         $"https://api.apilayer.com/currency_data/live?source={currency.Code}&currencies=EUR%2CJPY%2CGBP%2CAUD%2CCAD%2CCHF%2CUSD");
//         var jsonResponse = await response.Content.ReadAsStringAsync();// bak buraya
//         var apiLayerCurrencyData = JsonSerializer.Deserialize<GetCurrencyRatesResponse>(jsonResponse);