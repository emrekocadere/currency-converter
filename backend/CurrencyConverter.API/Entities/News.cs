using System;

namespace CurrencyConverter.API.Entities;

public class News
{
    public int Id { get; set;}
    public string? Author{ get; set;}
    required public string Title { get; set;}
    required public string Description{ get; set;}
    public string? Url{ get; set;}
    required public string Source{get;set;}
    public string? ImageUrl{get; set;}
    public string? Country{get; set;}
    public DateTime PublishedAt{get; set;}
}
