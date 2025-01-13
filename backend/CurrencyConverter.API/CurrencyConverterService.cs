using System;
using System.Text.Json;
using CurrencyConverter.API.DTOs;
using CurrencyConverter.API.Entities;

namespace CurrencyConverter.API;

public class CurrencyConverterService
{
    readonly private HttpClient _httpClient;
    readonly private IConfiguration _configuration;
    readonly private CurrencyConverterDbContext _dbContext;
    public CurrencyConverterService(HttpClient httpClient, IConfiguration configuration, CurrencyConverterDbContext dbContext)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _dbContext = dbContext;
    }

    public async Task<string> ConvertCurrency(ConvertCurrencyReqDTO dto)
    {

        _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]);
        using HttpResponseMessage response = await _httpClient.GetAsync($"https://api.apilayer.com/currency_data/convert?to={dto.ToCurrency}&from={dto.FromCurrency}&amount={dto.Amount}");
        var jsonResponse = await response.Content.ReadAsStringAsync();// bak buraya
        return jsonResponse;
    }

    public List<Currency> GetCurrencies()
    {
        return _dbContext.Currencies.ToList();
    }

    public void SaveTheNewsToDb(List<News> news)
    {
        _dbContext.News.AddRange(news);
        _dbContext.SaveChanges();
    }


    public List<News> GetNewsFromDb()
    {
        return _dbContext.News.ToList();
    }

    public async Task<string> GetCurrencyRates(GetCurrencyRatesDTO dto)
    {
        var todayDate = DateTime.Today.ToString("yyyy-MM-dd");
        var pastDate = DateTime.Today.AddMonths(-2).ToString("yyyy-MM-dd");

        _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]);
        using HttpResponseMessage response = await _httpClient.GetAsync($"https://api.apilayer.com/exchangerates_data/timeseries?start_date={pastDate}&end_date={todayDate}&base={dto.FromCurrency}&symbols={dto.ToCurrency}");
        var jsonResponse = await response.Content.ReadAsStringAsync();// bak buraya

        return jsonResponse;
    }

    public void  SaveTheCurencyRatesToDb(List<CurrencyRatio> currencyRatioList)
    {
            _dbContext.CurrencyRatios.AddRange(currencyRatioList);
            _dbContext.SaveChanges();
    }



}
