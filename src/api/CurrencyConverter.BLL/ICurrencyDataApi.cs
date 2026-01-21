using CurrencyConverter.BLL.Models.Responses;
using Refit;

namespace CurrencyConverter.BLL;

public interface ICurrencyDataApi
{

    [Get("/currency_data/live")]
    Task<GetCurrencyRatesResponse> GetNewsAsync([Header("apikey")] string apiKey,[Query] QueryParamss queryParamss);
}


public class QueryParamss
{
    public string source { get; set; }
    public string currencies { get; set; }
}