using System;
using CurrencyConverter.API.Entities;
using CurrencyConverter.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CurrencyConverter.DAL.Repositories;

public class CurrencyRatesTimestampRepository : Repository<CurrencyRatesTimestamp>, ICurrencyRatesTimestampRepository
{


    public CurrencyRatesTimestampRepository(CurrencyConverterDbContext dbContext) : base(dbContext)
    {
    }

    public List<CurrencyRatesTimestamp> GetCurrencyRatesForThreeMonths(string currencies)
    {
        var date = DateTime.Now.AddMonths(-15).ToString("yyyy-MM-dd");
        var startDate = DateTime.Parse(date);

        var endDate = DateTime.Parse(DateTime.Now.AddMonths(-14).ToString("yyyy-MM-dd"));

       return _context.CurrencyRatesTimestamps
        .AsNoTracking()
        .Where(x => x.Currencies == currencies)
        .ToList()
        .Where(x => DateTime.Parse(x.Timestamp) <= endDate && DateTime.Parse(x.Timestamp) >= startDate)
        .ToList();
    }


}
