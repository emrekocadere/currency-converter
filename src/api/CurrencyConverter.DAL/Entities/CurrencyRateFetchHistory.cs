using System;

namespace CurrencyConverter.DAL.Entities;

public class CurrencyRateFetchHistory
{
    public int Id { get; set; }
    public required string Currencies { get; set; }
    public DateOnly date { get; set; }

}
