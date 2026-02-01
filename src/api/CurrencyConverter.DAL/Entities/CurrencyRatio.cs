using System;

namespace CurrencyConverter.API.Entities;

public class CurrencyRatio
{
    public int Id { get; set; }
    public required string Currencies { get; set; }
    public required decimal Rate { get; set; }
    public DateTime UpdatedAt { get; set; }
}
