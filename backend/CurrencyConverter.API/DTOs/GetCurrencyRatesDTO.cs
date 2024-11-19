using System;

namespace CurrencyConverter.API.DTOs;

public class GetCurrencyRatesDTO
{
    required public string FromCurrency {get;set;}
    required public string ToCurrency {get;set;}
}
