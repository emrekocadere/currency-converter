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
    private List<CurrencyRatio> currencyRates;
    public CurrencyConverterService(HttpClient httpClient, IConfiguration configuration, CurrencyConverterDbContext dbContext)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _dbContext = dbContext;
        currencyRates = _dbContext.CurrencyRatios.ToList();
    }

    public decimal ConvertCurrency(ConvertCurrencyReqDTO dto)
    {
        var currencyRate = currencyRates.Where(x => x.Currencies == dto.Currencies).FirstOrDefault();
        decimal result = dto.Amount * currencyRate.Rate;
        return result;
    }
    public List<CurrencyRatio> GetCurrencyRates()
    {

        return currencyRates.Where(x=>x.Currencies.StartsWith("USD")).ToList();
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
    public void GetCurrencyRatesFromDb()
    {
        currencyRates = _dbContext.CurrencyRatios.ToList();
    }

    public void SaveTheCurencyRatesToDb(List<CurrencyRatio> currencyRatioList)
    {
        foreach(var currencyRate in currencyRatioList)
        {
                 if(_dbContext.CurrencyRatios.Any(cr => cr.Currencies == currencyRate.Currencies))
                 {
                   var currency =  _dbContext.CurrencyRatios.Where(x=>x.Currencies==currencyRate.Currencies).FirstOrDefault();
                   currency.Rate = currencyRate.Rate;

                 }
                 else{

                    _dbContext.CurrencyRatios.Add(currencyRate);
                 }
        }
       
        
        _dbContext.SaveChanges();
    }

    // public async Task<string> GetCurrencyRates(GetCurrencyRatesDTO dto)
    // {
    //     var todayDate = DateTime.Today.ToString("yyyy-MM-dd");
    //     var pastDate = DateTime.Today.AddMonths(-2).ToString("yyyy-MM-dd");

    //     _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]);
    //     using HttpResponseMessage response = await _httpClient.GetAsync($"https://api.apilayer.com/exchangerates_data/timeseries?start_date={pastDate}&end_date={todayDate}&base={dto.FromCurrency}&symbols={dto.ToCurrency}");
    //     var jsonResponse = await response.Content.ReadAsStringAsync();// bak buraya

    //     return jsonResponse;
    // }



}
