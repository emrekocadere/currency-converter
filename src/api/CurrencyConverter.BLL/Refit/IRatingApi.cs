using System;
using CurrencyConverter.BLL.ApiResponses;
using Refit;

namespace CurrencyConverter.BLL.Refit;

public interface IRatingApi
{
    [Get("/getExchange/{baseCurrency}/{targetCurrency}")]
    Task<RatingApiResponse> GetRatio(int baseCurrency, int targetCurrency);
}

