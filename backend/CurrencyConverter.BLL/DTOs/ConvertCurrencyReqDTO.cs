using System;

namespace CurrencyConverter.API.Dtos;

public class ConvertCurrencyReqDTO
{
    public decimal Amount { get; set; }
    public required string Currencies { get; set; }
    
}
