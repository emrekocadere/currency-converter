using System;
using System.Diagnostics;
using CurrencyConverter.DAL.Interfaces;
using CurrencyConverter.DAL.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CurrencyConverter.DAL;
public static class ServiceCollectionExtensions
{
    public static void AddCurrencyConverterDAL(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddDbContext<CurrencyConverterDbContext>(options =>
        options.UseSqlServer(configuration.GetConnectionString("ConnectionString")));

        
        services.AddScoped<INewsRepository, NewsRepository>();
        services.AddScoped<ICurrencyRepository, CurrencyRepository>();
        services.AddScoped<ICurrencyRatioRepository, CurrencyRatioRepository>();
        services.AddScoped<ICurrencyRatesTimestampRepository, CurrencyRatesTimestampRepository>();
    }
}
