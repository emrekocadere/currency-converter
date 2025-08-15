using System;
using System.Text.Json.Serialization;

namespace CurrencyConverter.API.DTOs;

public class GetCommonCurrenciesResponseDTO
{
    [JsonPropertyName("base")]
    public string Base { get; set;}
    public Dictionary <string,double> rates{ get; set;}

}
