using System;

namespace CurrencyConverter.API.DTOs;

public class UserLocationDTO
{
    public required string IpAddress { get; set; }
    public required string Country { get; set; }
    public required string City { get; set; }
}
