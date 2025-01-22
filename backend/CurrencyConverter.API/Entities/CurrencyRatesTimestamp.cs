using System;

namespace CurrencyConverter.API.Entities;

public class CurrencyRatesTimestamp
{
    public int Id { get; set; }
    public required string Currencies { get; set; }
    public DateTime Timestamp { get; set; }
    public float Rate { get; set; }
}
