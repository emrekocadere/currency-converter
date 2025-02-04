using System;
using CurrencyConverter.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace CurrencyConverter.API;

public class CurrencyConverterDbContext : DbContext
{
    public CurrencyConverterDbContext(DbContextOptions<CurrencyConverterDbContext> options) : base(options) { }
    public DbSet<Currency> Currencies { get; set; }
    public DbSet<News> News { get; set; }
    public DbSet<CurrencyRatio> CurrencyRatios { get; set; }
    public DbSet<CurrencyRatesTimestamp> CurrencyRatesTimestamps { get; set; }
    public DbSet<VisitingUser> VisitingUserss { get; set; }
    public DbSet<ErrorLog> ErrorLogs { get; set; }


}
