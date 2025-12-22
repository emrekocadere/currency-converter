using System;
using CurrencyConverter.API;
using Microsoft.Extensions.DependencyInjection;

namespace CurrencyConverter.BLL;
public static class ServiceCollectionsExtensions
{
    public static void AddBll(this IServiceCollection services)
    {
        services.AddScoped<CurrencyConverterService>();
  
    }
}
