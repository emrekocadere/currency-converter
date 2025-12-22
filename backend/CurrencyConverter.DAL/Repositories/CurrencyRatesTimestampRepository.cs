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

    public CurrencyRatesTimestamp ConvertCurrencyForSpecificDate(string date, string currencies)
    {
             return _context.CurrencyRatesTimestamps
            .FirstOrDefault(x => x.Currencies == currencies && x.Timestamp == date);
    }

    public List<CurrencyRatesTimestamp> GetCurrencyRatesForThreeMonths(string currencies)
    {
        var date = DateTime.Now.AddMonths(-13).ToString("yyyy-MM-dd");
        var startDate = DateTime.Parse(date);

        var endDate = DateTime.Parse(DateTime.Now.AddMonths(-5).ToString("yyyy-MM-dd"));

       return _context.CurrencyRatesTimestamps
        .AsNoTracking()
        .Where(x => x.Currencies == currencies)
        .ToList()
        .Where(x => DateTime.Parse(x.Timestamp) <= endDate && DateTime.Parse(x.Timestamp) >= startDate)
        .ToList();
    }


}
