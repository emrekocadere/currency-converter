using System;

namespace CurrencyConverter.API.Entities;

public class VisitingUser
{
    public int Id { get; set; }
    public required string IpAddress { get; set; }
    public required string City { get; set; }
    public required string Country{ get; set; }
}
