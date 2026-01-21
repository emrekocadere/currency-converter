using System;
using CurrencyConverter.API;
using CurrencyConverter.BLL.Common.Caching;
using CurrencyConverter.BLL.Service;
using Microsoft.Extensions.DependencyInjection;

namespace CurrencyConverter.BLL;
public static class ServiceCollectionsExtensions
{
    public static void AddBll(this IServiceCollection services)
    {
        services.AddScoped<CurrencyConverterService>();
        services.AddScoped<ICacheService,CacheService>();
  
    }
}
