using System;
using CurrencyConverter.API.Entities;
using CurrencyConverter.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CurrencyConverter.DAL.Repositories;

public class CurrencyRepository : Repository<Currency>, ICurrencyRepository
{
    public CurrencyRepository(CurrencyConverterDbContext context) : base(context) // bu olmaz sa hata oluyor neden
    {
    }

    public List<Currency> GetCurrencies()
    {
       return _context.Currencies.ToList();
    }
}
