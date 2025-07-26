using System.Text.Json;
using CurrencyConverter.API.CutomResponses;
using CurrencyConverter.API.DTOs;
using CurrencyConverter.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace CurrencyConverter.API;

public class CurrencyConverterService
{

     private CurrencyConverterDbContext _dbContext;
    private List<CurrencyRatio> _currencyRates;
    private readonly HttpClient _httpClient;
        private int _pageSize;
    public CurrencyConverterService(CurrencyConverterDbContext dbContext)
    {
        _dbContext = dbContext;
        _currencyRates = _dbContext.CurrencyRatios.ToList();
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
        _currencyRates = _dbContext.CurrencyRatios.ToList();
    }

    public CustomResponse SaveTheCurencyRatesToDb(List<CurrencyRatio> currencyRatioList)
    {
        foreach (var currencyRate in currencyRatioList)
        {
            if (_dbContext.CurrencyRatios.Any(cr => cr.Currencies == currencyRate.Currencies))
            {
                var currency = _dbContext.CurrencyRatios.FirstOrDefault(x => x.Currencies == currencyRate.Currencies);
                currency!.Rate = currencyRate.Rate;

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
        List<CurrencyRatesTimestamp> currencyRatesTimestamps;

        try
        {
            currencyRatesTimestamps = _dbContext.CurrencyRatesTimestamps
            .AsNoTracking()
            .Where(x => x.Currencies == currencies)
            .ToList()
            .Where(x => DateTime.Parse(x.Timestamp) <= endDate && DateTime.Parse(x.Timestamp) >= startDate)
            .ToList();
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
    
    public async Task<dynamic> GetCurrencyRatesss()
    {


        _httpClient.DefaultRequestHeaders.Add("apikey", "IzQFmwF5B7PrJNgg4ibxwCZqIO5DfQuA");
        var currencyList = GetCurrencies();

        foreach (var currency in currencyList)
        {

            using HttpResponseMessage response = await _httpClient.GetAsync($"https://api.apilayer.com/exchangerates_data/timeseries?start_date=2025-01-01&end_date=2025-01-22&base={currency.Code}&symbols=EUR,JPY,GBP,AUD,CAD,CHF,USD");
            var jsonResponse = await response.Content.ReadAsStringAsync();// bak buraya
            var abc = JsonSerializer.Deserialize<RateTimeSeriesResponse>(jsonResponse);

            foreach (var rate in abc.rates)
            {

                foreach (var rateValue in rate.Value)
                {
                    var CurrenyRatesTimestamp = new CurrencyRatesTimestamp();
                    CurrenyRatesTimestamp.Timestamp = rate.Key;
                    CurrenyRatesTimestamp.Rate = rateValue.Value;
                    CurrenyRatesTimestamp.Currencies = abc.Base + rateValue.Key;
                    _dbContext.CurrencyRatesTimestamps.Add(CurrenyRatesTimestamp);
                    _dbContext.SaveChanges();
                }
            }

        }


        List<CurrencyRatesTimestamp> currencyRatesTimestamps = new List<CurrencyRatesTimestamp>();


        return currencyRatesTimestamps;
    }

    public dynamic ConvertCurrencyForSpecificDate(string date, string currencies, int amount)
    {

        var currencyRatesTimestamps = _dbContext.CurrencyRatesTimestamps
            .FirstOrDefault(x => x.Currencies == currencies && x.Timestamp == date);

        decimal result = amount * currencyRatesTimestamps.Rate;

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

        var affectedRows = _dbContext.SaveChanges();

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
