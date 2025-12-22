using System;

namespace CurrencyConverter.API.Entities;

public class Currency
{
    public int Id { get; set; }
   required public string Name{ get; set; }
   required public string Code  { get; set; }
   required public string Symbol{ get; set; }
}
