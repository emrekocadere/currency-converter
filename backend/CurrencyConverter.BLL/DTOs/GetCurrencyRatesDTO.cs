using System;

namespace CurrencyConverter.API.Dtos;

public class GetCurrencyRatesDto
{
    required public string FromCurrency {get;set;}
    required public string ToCurrency {get;set;}
}
