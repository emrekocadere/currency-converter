using CurrencyConverter.BLL.Service;

namespace CurrencyConverter.API.Endpoints;

public static class CurrencyConverterEndpoints
{
    public static IEndpointRouteBuilder MapCurrencyConverterEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/currency-converter")
            .WithTags("Currency Converter");

        group.MapGet("/exchange", 
            (decimal amount, string currencies, ICurrencyConverterService service) 
                => service.ConvertCurrency(amount, currencies));

        group.MapGet("/currencies", 
            (ICurrencyConverterService service) 
                => service.GetCurrencies());

        group.MapGet("/currency-rates", 
            (string currency, ICurrencyConverterService service) 
                => service.GetCurrencyRates(currency));

        group.MapGet("/currency-rates/history", 
            (string currencies, ICurrencyConverterService service) 
                => service.GetCurrencyRatesForThreeMonths(currencies));

        group.MapGet("/exchange/by-date", 
            (string date, string currencies, int amount, ICurrencyConverterService service) 
                => service.ConvertCurrencyForSpecificDate(date, currencies, amount));

        group.MapGet("/news", 
            (int pageNumber, ICurrencyConverterService service) 
                => service.Paginate(pageNumber));

        return app;
    }
}