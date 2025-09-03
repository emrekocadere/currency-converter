using System;

namespace CurrencyConverter.API.Dtos;

public class ConvertCurrencyForSpecificDateDTO
{
    public required string Date{ get; set; }
    public required string Currencies { get; set; }
    public int Amount { get; set; }
}
