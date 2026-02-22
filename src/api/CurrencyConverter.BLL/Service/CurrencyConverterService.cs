using CurrencyConverter.API.Entities;
using CurrencyConverter.BLL.Common.Caching;
using CurrencyConverter.BLL.Results;
using CurrencyConverter.DAL.Interfaces;
namespace CurrencyConverter.BLL.Service;

public class CurrencyConverterService : ICurrencyConverterService
{
    private readonly ICurrencyRepository _currencyRepository;
    private readonly ICurrencyRatioRepository _currencyRatioRepository;
    private readonly INewsRepository _newsRepository;
    private readonly ICurrencyRatesTimestampRepository _currencyRatesTimestampRepository;

    private readonly ICacheService _cache;

    public CurrencyConverterService(ICurrencyRepository currencyRepository,
        ICurrencyRatioRepository currencyRatioRepository,
        INewsRepository newsRepository,
        ICurrencyRatesTimestampRepository currencyRatesTimestampRepository,
        ICacheService cache)
    {
        _currencyRepository = currencyRepository;
        _currencyRatioRepository = currencyRatioRepository;
        _newsRepository = newsRepository;
        _currencyRatesTimestampRepository = currencyRatesTimestampRepository;
        _cache = cache;
    }

    public Result<decimal> ConvertCurrency(decimal amount, string currencies)
    {
        var fromCurrency = currencies?.Substring(0, 3);
        var toCurrency = currencies?.Substring(3, 3);
        if (fromCurrency == toCurrency)
        {
            return amount;
        }
        else
        {
            var ratios  = GetCurrencyRatios();
            var currencyRatio = ratios.FirstOrDefault(x => x.Currencies == currencies);
            decimal result = amount * currencyRatio.Rate;
            return result;
        }


      
    }

    public Result<List<CurrencyRatio>> GetCurrencyRates(string currentCurrency)
    {
        var ratios = GetCurrencyRatios();
        return ratios.Where(x => x.Currencies.StartsWith(currentCurrency)).ToList();
    }

    public Result<List<Currency>> GetCurrencies()
    {
        var currencies = _cache.GetOrCreate("Currencies", () =>
                _currencyRepository.GetAll()
            , TimeSpan.FromHours(1));
        return currencies;
    }

    public Result SaveTheNewsToDb(List<News> news)
    {
        try
        {
            _newsRepository.Addrange(news);
            _newsRepository.SaveChanges();
        }
        catch (Exception ex)
        {
            return Errors.NotSavedToDb;
        }

        return Result.Success();
    }


    private List<CurrencyRatio> GetCurrencyRatios()
    {
        var ratios = _cache.GetOrCreate("CurrencyRatios", () =>
                _currencyRatioRepository.GetAll()
            , TimeSpan.FromHours(1));
        return ratios;
    }


    public Result SaveTheCurencyRatesToDb(List<CurrencyRatio> currencyRatioList)
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
            return Result.Success();
        }
        else
        {
            return Errors.NotSavedToDb;
        }
    }

    public dynamic GetCurrencyRatesForThreeMonths(string currencies)
    {
        try
        {
            var currencyRatesTimestamps = _currencyRatesTimestampRepository.GetCurrencyRatesForThreeMonths(currencies);
            return currencyRatesTimestamps;
        }
        catch (Exception ex)
        {
            return Errors.NotSavedToDb;
        }
    }

    public Result<decimal> ConvertCurrencyForSpecificDate(string date, string currencies, int amount)
    {
        var currencyRatesTimestamps =
            _currencyRatesTimestampRepository.ConvertCurrencyForSpecificDate(date, currencies);

        decimal result = amount * currencyRatesTimestamps.Rate;

        return result;
    }

    public Result<List<News>> Paginate(int pageNumber)
    {
        var news = _newsRepository.GetNewsByPage(pageNumber, 6);
        return news;
    }
}