using System;

namespace CurrencyConverter.API.Entities;

public class News
{
    public int Id { get; set; }
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
