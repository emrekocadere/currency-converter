using System;

namespace CurrencyConverter.API.CutomResponses;

public class CustomResponse
{
    public int StatusCode { get; set; }
    public   string  StatusDesc { get; set; }
    public dynamic? Data { get; set; }

}
