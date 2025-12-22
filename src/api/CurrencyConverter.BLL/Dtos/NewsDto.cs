using CurrencyConverter.API.Entities;

namespace CurrencyConverter.API.Dtos;

public class NewsDto
{
    public string? Author { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Url { get; set; }
    public string? Source { get; set; }
    public string? Image { get; set; }
    public string? PublishedAt { get; set; }
}