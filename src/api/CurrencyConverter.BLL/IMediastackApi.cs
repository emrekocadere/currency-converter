using System;
using CurrencyConverter.API;
using CurrencyConverter.BLL.Models.Responses;
using Refit;

namespace CurrencyConverter.BLL;

public interface IMediastackApi
{
    [Get("/v1/news")]
    Task<MediastackResponse> GetNewsAsync([Query] QueryParams queryParams);
}

public class QueryParams
{
    public string access_key { get; set; }
    public string date { get; set; }
    public string categories { get; set; }
    public string languages { get; set; }
    public string keywords { get; set; }
    public int limit { get; set; }
}