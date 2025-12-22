using System;

namespace CurrencyConverter.API.Dtos;

public class UserLocationDTO
{
    public required string IpAddress { get; set; }
    public required string Country { get; set; }
    public required string City { get; set; }
}
