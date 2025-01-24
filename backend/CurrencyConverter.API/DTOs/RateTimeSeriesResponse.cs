using System;
using System.Text.Json.Serialization;

namespace CurrencyConverter.API.DTOs;

public class RateTimeSeriesResponse
{
    public bool success { get; set; }
    public bool timeseries { get; set; }
    public string ?start_date { get; set; }
    public string ?end_date { get; set; }
    [JsonPropertyName("base")]
    public string ?Base { get; set; }
    public Dictionary<string, Dictionary<string, decimal>> ?rates { get; set; }

}
