using System;
using CurrencyConverter.API.Entities;
using CurrencyConverter.BLL.Results;

namespace CurrencyConverter.BLL.Service;

public interface ICurrencyConverterService
{
    Result<decimal> ConvertCurrency(decimal amount, string currencies);
    Result<decimal> ConvertCurrencyForSpecificDate(string date, string currencies, int amount);
    Result<List<Currency>> GetCurrencies();
    Result<List<CurrencyRatio>> GetCurrencyRates(string currentCurrency);
    dynamic GetCurrencyRatesForThreeMonths(string currencies);
    Result<List<News>> Paginate(int pageNumber);
    // Task Save();
}
