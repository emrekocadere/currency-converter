using System;

namespace CurrencyConverter.API.DTOs;

public class ConvertCurrencyForSpecificDateDTO
{
    public required string Date{ get; set; }
    public required string Currencies { get; set; }
    public int Amount { get; set; }
}
