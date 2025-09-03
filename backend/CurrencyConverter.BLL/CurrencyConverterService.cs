using System.Text.Json;
using CurrencyConverter.API;
using CurrencyConverter.API.CutomResponses;
using CurrencyConverter.API.Dtos;
using CurrencyConverter.API.Entities;
using CurrencyConverter.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CurrencyConverter.BLL;

public class CurrencyConverterService
{

    private readonly ICurrencyRepository _currencyRepository;
    private readonly ICurrencyRatioRepository _currencyRatioRepository;
    private readonly INewsRepository _newsRepository;
    private readonly ICurrencyRatesTimestampRepository _currencyRatesTimestampRepository;
    private List<CurrencyRatio> _currencyRates;
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private int _pageSize;
    
    public CurrencyConverterService(ICurrencyRepository currencyRepository,
     ICurrencyRatioRepository currencyRatioRepository,
      INewsRepository newsRepository,
      ICurrencyRatesTimestampRepository currencyRatesTimestampRepository)
    {
        _currencyRepository = currencyRepository;
        _currencyRatioRepository = currencyRatioRepository;
        _newsRepository = newsRepository;
        _currencyRatesTimestampRepository = currencyRatesTimestampRepository;

        _currencyRates = _currencyRatioRepository.GetAll();
        _pageSize = 6;
        _httpClient = new HttpClient();
    }

    public CustomResponse ConvertCurrency(int amount, string currencies)
    {
        var currencyRate = _currencyRates.FirstOrDefault(x => x.Currencies == currencies);
        if (currencyRate == null)
        {
            return new NotFoundOnDb();
        }
        decimal result = amount * currencyRate.Rate;
        return new SuccessResponse()
        {
            Data = result
        };
    }
    public List<CurrencyRatio> GetCurrencyRates(string currentCurrency)
    {

        return _currencyRates.Where(x => x.Currencies.StartsWith(currentCurrency)).ToList();
    }

    public List<Currency> GetCurrencies()
    {
        return _currencyRepository.GetAll();
    }

    public CustomResponse SaveTheNewsToDb(List<News> news) // repo
    {
        try
        {
            _newsRepository.Addrange(news);//
            _newsRepository.SaveChanges();


        }
        catch (Exception ex)
        {
            return new ExceptionResponse(ex.Message);
        }
        return new SuccessResponse();

    }

    public List<News> GetNewsFromDb()
    {
        return _newsRepository.GetAll();
    }
    public void GetCurrencyRatesFromDb()
    {
        _currencyRates = _currencyRatioRepository.GetAll();
    }

    public CustomResponse SaveTheCurencyRatesToDb(List<CurrencyRatio> currencyRatioList) // repo
    {
        foreach (var currencyRate in currencyRatioList)
        {
            var currencyRatio = _currencyRatioRepository.FindByName(currencyRate.Currencies);

            if (currencyRatio != null)
            {
                currencyRatio.Rate = currencyRate.Rate;

            }
            else
            {
                _currencyRatioRepository.Add(currencyRate);

            }

        }
        var affectedRow = _currencyRatioRepository.SaveChanges();
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

        List<CurrencyRatesTimestamp> currencyRatesTimestamps;

        try
        {
            currencyRatesTimestamps = _currencyRatesTimestampRepository.GetCurrencyRatesForThreeMonths(currencies);
        }
        catch (Exception ex)
        {
            return new NotFoundOnDb()
            {
                StatusDesc = "Currency rates not found for the specified date range.",
                Data = ex.Message
            };
        }


        return new SuccessResponse()
        {

            StatusDesc = "Currency rates retrieved successfully.",
            Data = currencyRatesTimestamps
        };
    }



    public dynamic ConvertCurrencyForSpecificDate(string date, string currencies, int amount)
    {
        var currencyRatesTimestamps = _currencyRatesTimestampRepository.ConvertCurrencyForSpecificDate(date, currencies);

        decimal result = amount * currencyRatesTimestamps.Rate;

        return result;
    }

    public List<News> Paginate(int pageNumber) // repo
    {

        var news = _newsRepository.GetNewsByPage(pageNumber, _pageSize);
        return news;

    }
    // public CustomResponse SaveUserLocation(UserLocationDTO dto)
    // {
    //     _dbContext.VisitingUserss.Add(new VisitingUser()
    //     {
    //         IpAddress = dto.IpAddress,
    //         City = dto.City,
    //         Country = dto.Country
    //     });

    //     var affectedRows = _dbContext.SaveChanges();

    //     if (affectedRows == 1)
    //     {

    //         return new SuccessResponse();
    //     }
    //     else
    //     {
    //         return new NotSavedToDb();
    //     }

    // }


    public async Task Save()
    {
        using HttpResponseMessage response = await _httpClient.GetAsync($"http://api.mediastack.com/v1/news?access_key=ca29cb201d8041ae28ee4f43cfa7a958&limit=100&languages=en&categories=business");
        var jsonResponse = await response.Content.ReadAsStringAsync();
        var mediastackResponse = JsonSerializer.Deserialize<MediastackResponse>(jsonResponse);
        var newsList = new List<News>();
        foreach (var data in mediastackResponse.data!)
        {
            if (data.Image != null)
            {
                newsList.Add(data);
            }
        }


        SaveTheNewsToDb(newsList);

    }





}


