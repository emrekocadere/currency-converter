using System;
using CurrencyConverter.API.Entities;

namespace CurrencyConverter.API;

public class Pagination
{
    public int limit { get; set; }
    public int offset { get; set; }
    public int count { get; set; }
    public int total { get; set; }
}
public class Data
{
    public string? author { get; set; }
    public string? title { get; set; }
    public string? description { get; set; }
    public string? url { get; set; }
    public string? source { get; set; }
    public string? image { get; set; }
    public string? category { get; set; }
    public string? language { get; set; }
    public string? country { get; set; }
    public DateTime published_at { get; set; }

}
public class MediastackResponse
{
    public Pagination pagination{ get; set; }
    public List<News> data{ get; set; }
}
