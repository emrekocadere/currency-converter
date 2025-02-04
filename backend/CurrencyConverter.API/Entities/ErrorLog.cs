using System;

namespace CurrencyConverter.API.Entities;

public class ErrorLog
{
    public int Id { get; set; }
    public required string Error{ get; set; }
}
