using System;
using System.Reflection.Metadata.Ecma335;
using CurrencyConverter.DAL.Entities;
using CurrencyConverter.DAL.Interfaces;

namespace CurrencyConverter.DAL.Repositories;

public class RateFetchHistoryRepository : Repository<CurrencyRateFetchHistory>, IRateFetchHistoryRepository
{
    public RateFetchHistoryRepository(CurrencyConverterDbContext context) : base(context)
    {
    }

    public CurrencyRateFetchHistory? GetLastRecordDate()
    {
        return _dbSet
        .OrderByDescending(x => x.Id)
        .FirstOrDefault();
    }

    public bool IsExist(DateOnly date, string currencies)
    {
        return _dbSet.Any(x=>x.date==date&&x.Currencies==currencies);
    }
}
