using System;
using System.Text.Json;
using CurrencyConverter.API.DTOs;
using CurrencyConverter.API.Entities;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.EntityFrameworkCore;

namespace CurrencyConverter.API;

public class CurrencyConverterService
{
    readonly private HttpClient _httpClient;
    readonly private IConfiguration _configuration;
    readonly private CurrencyConverterDbContext _dbContext;
    private List<CurrencyRatio> currencyRates;
    private int _pageSize;
    public CurrencyConverterService(HttpClient httpClient, IConfiguration configuration, CurrencyConverterDbContext dbContext)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _dbContext = dbContext;
        currencyRates = _dbContext.CurrencyRatios.ToList();
        _pageSize=6;
    }

    public decimal ConvertCurrency(ConvertCurrencyReqDTO dto)
    {
        var currencyRate = currencyRates.Where(x => x.Currencies == dto.Currencies).FirstOrDefault();
        decimal result = dto.Amount * currencyRate.Rate;
        return result;
    }
    public List<CurrencyRatio> GetCurrencyRates(string currentCurrency)
    {

        return currencyRates.Where(x => x.Currencies.StartsWith(currentCurrency)).ToList();
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
        foreach (var currencyRate in currencyRatioList)
        {
            if (_dbContext.CurrencyRatios.Any(cr => cr.Currencies == currencyRate.Currencies))
            {
                var currency = _dbContext.CurrencyRatios.Where(x => x.Currencies == currencyRate.Currencies).FirstOrDefault();
                currency.Rate = currencyRate.Rate;

            }
            else
            {

                _dbContext.CurrencyRatios.Add(currencyRate);
            }
        }
        _dbContext.SaveChanges();
    }

    // public async Task<dynamic> GetCurrencyRatesss()
    // {


    //     _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]);
    //     var currencyList = GetCurrencies();

    //     foreach (var currency in currencyList)
    //     {

    //         using HttpResponseMessage response = await _httpClient.GetAsync($"https://api.apilayer.com/exchangerates_data/timeseries?start_date=2025-01-01&end_date=2025-01-22&base={currency.Code}&symbols=EUR,JPY,GBP,AUD,CAD,CHF,USD");
    //         var jsonResponse = await response.Content.ReadAsStringAsync();// bak buraya
    //         var abc = JsonSerializer.Deserialize<RateTimeSeriesResponse>(jsonResponse);

    //         foreach (var rate in abc.rates)
    //         {

    //             foreach (var rateValue in rate.Value)
    //             {
    //                 var CurrenyRatesTimestamp = new CurrencyRatesTimestamp();
    //                 CurrenyRatesTimestamp.Timestamp = rate.Key;
    //                 CurrenyRatesTimestamp.Rate = rateValue.Value;
    //                 CurrenyRatesTimestamp.Currencies = abc.Base + rateValue.Key;
    //                 _dbContext.CurrencyRatesTimestamps.Add(CurrenyRatesTimestamp);
    //                 _dbContext.SaveChanges();
    //             }
    //         }

    //     }


    //     List<CurrencyRatesTimestamp> currencyRatesTimestamps = new List<CurrencyRatesTimestamp>();


    //     return currencyRatesTimestamps;
    // }


    public dynamic GetCurrencyRatesForThreeMonths(string currencies)
    {
        var date = DateTime.Now.AddMonths(-15).ToString("yyyy-MM-dd");
        var startDate = DateTime.Parse(date);

        var endDate = DateTime.Parse(DateTime.Now.AddMonths(-14).ToString("yyyy-MM-dd"));

        var currencyRatesTimestamps = _dbContext.CurrencyRatesTimestamps
            .Where(x => x.Currencies == currencies)
            .ToList()
            .Where(x => DateTime.Parse(x.Timestamp) <= endDate && DateTime.Parse(x.Timestamp) >= startDate)
            .ToList();

        return currencyRatesTimestamps;

    }

    public dynamic ConvertCurrencyForSpecificDate(ConvertCurrencyForSpecificDateDTO dto)
    {

        var currencyRatesTimestamps = _dbContext.CurrencyRatesTimestamps
            .Where(x => x.Currencies == dto.Currencies && x.Timestamp == dto.Date).FirstOrDefault();

        decimal result = dto.Amount * currencyRatesTimestamps.Rate;

        return result;

    }


    public List<News> Paginate(int pageNumber)
    {

            
            // sayfaSayısı=toplamEleman/sayfadaGösterilcekeElemanSayısı
            // şuankiSayfaSayısı-1 * sayfadaGösterilcekeElemanSayısı skip
            // take(sayfadaGösterilcekeElemanSayısı)

            var news=_dbContext.News.Skip((pageNumber-1)*_pageSize).Take(_pageSize).ToList();
            return news;

    }



}
