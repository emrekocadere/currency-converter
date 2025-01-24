using System;

namespace CurrencyConverter.API.Entities;

public class CurrencyRatesTimestamp
{
    public int Id { get; set; }
    public  string ?Currencies { get; set; }
    public  string ?Timestamp { get; set; }
    public decimal Rate { get; set; }
}
