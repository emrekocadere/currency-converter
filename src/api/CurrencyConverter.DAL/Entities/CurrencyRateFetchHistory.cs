using System;

namespace CurrencyConverter.DAL.Entities;

public class CurrencyRateFetchHistory
{
    public int Id { get; set; }
    public DateOnly date { get; set; }

}
