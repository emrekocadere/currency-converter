using System;

namespace CurrencyConverter.BLL.Models.Responses;

public class GetCurrencyRatesResponse
{
    public bool success { get; set; }
    public long timestamp { get; set; }
    public string? source { get; set; }
    public Dictionary<string, decimal>? quotes { get; set; }
}
