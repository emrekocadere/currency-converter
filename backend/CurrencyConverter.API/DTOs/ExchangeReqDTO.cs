using System;

namespace CurrencyConverter.API.DTOs;

public class ExchangeReqDTO
{
    public double Amount { get; set; }
    required public string FromCurrency{ get; set; }
    required public string ToCurrency{ get; set; }
    
}
