using System;
using CurrencyConverter.API.Entities;

namespace CurrencyConverter.DAL.Interfaces;

public interface ICurrencyRepository:IRepository<Currency>
{
    List<Currency> GetCurrencies();
}
