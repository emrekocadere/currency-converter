using System;

namespace CurrencyConverter.BLL.ApiResponses;

public class RatingApiResponse
{
    public string desc{ get; set; }
    public int code { get; set; }
    public RatingApiData? data { get; set; }

}

public class RatingApiData
{   
    public string value { get; set; }
}