using System;
using CurrencyConverter.API.Entities;
using CurrencyConverter.BLL.Results;
using CurrencyConverter.DAL.Interfaces;

namespace CurrencyConverter.BLL.Service;

public class CurrencyConverterService(
    ICurrencyRepository _currencyRepository,
    ICurrencyRatioRepository _currencyRatioRepository,
    INewsRepository _newsRepository,
    ICurrencyRatesTimestampRepository _currencyRatesTimestampRepository,
    List<CurrencyRatio> _currencyRates)
    : ICurrencyConverterService
{
    

    public Result<decimal> ConvertCurrency(int amount, string currencies)
    {
        var currencyRate = _currencyRates.FirstOrDefault(x => x.Currencies == currencies);
        if (currencyRate == null)
        {
            return Error.None;
        }

        decimal result = amount * currencyRate.Rate;

        return result;
    }

    public Result<List<CurrencyRatio>> GetCurrencyRates(string currentCurrency)
    {
        return _currencyRates.Where(x => x.Currencies.StartsWith(currentCurrency)).ToList();
    }

    public Result<List<Currency>> GetCurrencies()
    {
        return _currencyRepository.GetAll();
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



    public void GetCurrencyRatesFromDb()
    {
        _currencyRates = _currencyRatioRepository.GetAll();
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
