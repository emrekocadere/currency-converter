using System;

namespace CurrencyConverter.API;

public class GetCurrencyRatesResponse
{
    public bool success { get; set; }
    public long timestamp { get; set; }
    public string? source { get; set; }
    public Dictionary<string, decimal>? quotes { get; set; }
}
