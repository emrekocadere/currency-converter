using System;
using System.Text.Json;
using CurrencyConverter.API.CutomResponses;
using CurrencyConverter.API.DTOs;
using CurrencyConverter.API.Entities;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Http.HttpResults;
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
        _pageSize = 6;
    }

    public CustomResponse ConvertCurrency(ConvertCurrencyReqDTO dto)
    {
        var currencyRate = currencyRates.Where(x => x.Currencies == dto.Currencies).FirstOrDefault();
        if (currencyRate == null)
        {
            return new NotFoundOnDb();
        }
        decimal result = dto.Amount * currencyRate.Rate;
        return new SuccessResponse()
        {
            Data = result
        };
    }
    public List<CurrencyRatio> GetCurrencyRates(string currentCurrency)
    {

        return currencyRates.Where(x => x.Currencies.StartsWith(currentCurrency)).ToList();
    }

    public List<Currency> GetCurrencies()
    {
        return _dbContext.Currencies.ToList();
    }

    public CustomResponse SaveTheNewsToDb(List<News> news)
    {
        try
        {
            _dbContext.News.AddRange(news);
            _dbContext.SaveChanges();
        }
        catch (Exception ex)
        {
            return new ExceptionResponse(ex.Message);
        }
        return new SuccessResponse();

    }

    public List<News> GetNewsFromDb()
    {
        return _dbContext.News.ToList();
    }
    public void GetCurrencyRatesFromDb()
    {
        currencyRates = _dbContext.CurrencyRatios.ToList();
    }

    public CustomResponse SaveTheCurencyRatesToDb(List<CurrencyRatio> currencyRatioList)
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
        var affectedRow = _dbContext.SaveChanges();
        if (affectedRow == currencyRatioList.Count)
        {
            return new SuccessResponse();
        }
        else
        {
            return new NotSavedToDb();
        }
    }

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

        var news = _dbContext.News.Skip((pageNumber - 1) * _pageSize).Take(_pageSize).ToList();
        return news;

    }
    public CustomResponse SaveUserLocation(UserLocationDTO dto)
    {
        _dbContext.VisitingUserss.Add(new VisitingUser()
        {
            IpAddress = dto.IpAddress,
            City = dto.City,
            Country = dto.Country
        });

        var affectedRows= _dbContext.SaveChanges();

        if (affectedRows == 1)
        {

            return new SuccessResponse();
        }
        else
        {
            return new NotSavedToDb();
        }


    }



}
