using System;

namespace CurrencyConverter.API.Entities;

public class CurrencyRatio
{
    public int Id { get; set; }
    public  Currency? BaseCurrency { get; set; }
    public int BaseCurrencyId { get; set; }
    public  Currency? TargetCurrency { get; set; }
    public int TargetCurrencyId { get; set; }
    public double Ratio { get; set; }
    public DateTime Date { get; set; }
}
