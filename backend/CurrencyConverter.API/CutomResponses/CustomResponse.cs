using System;

namespace CurrencyConverter.API.CutomResponses;

public class CustomResponse
{
    public int StatusCode { get; set; }
    public required string StatusDesc { get; set; }
    public required object Data { get; set; }


}
