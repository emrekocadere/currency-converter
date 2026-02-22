using CurrencyConverter.BLL.Results;
using CurrencyConverter.BLL.Service;

namespace CurrencyConverter.API.Endpoints;
public static class CurrencyConverterEndpoints
{
    public static void MapCurrencyConverterEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/CurrencyConverter");

        group.MapGet("/exchange", 
            (decimal amount, string currencies, ICurrencyConverterService service) =>
            {
                if (amount <= 0)
                    return Results.BadRequest(new Result(false, Errors.InvalidAmount));

                return Results.Ok(service.ConvertCurrency(amount, currencies));
            });

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
            (string date, string currencies, int amount, ICurrencyConverterService service) =>
            {
                if (amount <= 0)
                    return Results.BadRequest(new Result(false, Errors.InvalidAmount));

                return Results.Ok(service.ConvertCurrencyForSpecificDate(date, currencies, amount));
            });

        group.MapGet("/news", 
            (int pageNumber, ICurrencyConverterService service) =>
            {
                if (pageNumber < 1)
                    return Results.BadRequest(new Result(false, Errors.InvalidPageNumber));

                return Results.Ok(service.Paginate(pageNumber));
            });
    }
}