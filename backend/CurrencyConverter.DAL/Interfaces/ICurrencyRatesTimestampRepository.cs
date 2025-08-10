using System;
using CurrencyConverter.API.Entities;

namespace CurrencyConverter.DAL.Interfaces;

public interface ICurrencyRatesTimestampRepository : IRepository<CurrencyRatesTimestamp>
{
    List<CurrencyRatesTimestamp> GetCurrencyRatesForThreeMonths(string currencies);
   CurrencyRatesTimestamp ConvertCurrencyForSpecificDate(string date, string currencies);
    
}
