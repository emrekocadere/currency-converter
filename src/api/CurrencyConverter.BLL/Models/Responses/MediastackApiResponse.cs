using System;
using CurrencyConverter.API.Entities;

namespace CurrencyConverter.BLL.Models.Responses;

public class Pagination
{
    public int limit { get; set; }
    public int offset { get; set; }
    public int count { get; set; }
    public int total { get; set; }
}

public class MediastackResponse
{
    public Pagination? pagination{ get; set; }
    public List<News>? data{ get; set; }
}
