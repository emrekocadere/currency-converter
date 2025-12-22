using System;
using CurrencyConverter.API.Entities;
using CurrencyConverter.DAL.Interfaces;
using Microsoft.VisualBasic;

namespace CurrencyConverter.DAL.Repositories;

public class CurrencyRatioRepository : Repository<CurrencyRatio>, ICurrencyRatioRepository
{
    
    public CurrencyRatioRepository(CurrencyConverterDbContext dbContext) : base(dbContext)
    {
    }
    public CurrencyRatio FindByName(string name)
    {
        var currencyRatio = _context.CurrencyRatios.FirstOrDefault(x => x.Currencies == name);
        if(currencyRatio == null)
        {
            return null!;
        }
        return currencyRatio;
    }
}
