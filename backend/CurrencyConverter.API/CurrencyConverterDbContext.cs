using System;
using CurrencyConverter.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace CurrencyConverter.API;

public class CurrencyConverterDbContext : DbContext
{
    public CurrencyConverterDbContext(DbContextOptions<CurrencyConverterDbContext> options) : base(options) { }
    public DbSet<Currency> Currencies { get; set; }

}
