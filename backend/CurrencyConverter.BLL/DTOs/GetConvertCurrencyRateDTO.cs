using System;

namespace CurrencyConverter.API.Dtos;

public class GetConvertCurrencyRateDto
{
    public required string StartDate{ get; set; }
    public required string EndDate{ get; set; }
    public required string BaseCurrency{ get; set; }
    public required string OutputCurrency{ get; set; }
}
