using CurrencyConverter.API.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace CurrencyConverter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyConverterController : ControllerBase
    {
        private readonly CurrencyConverterService service;
        public CurrencyConverterController(CurrencyConverterService service)
        {
            this.service = service;
        }
        [HttpPost("ConvertCurrency")]
        public async Task<ActionResult> ConvertCurrency(ConvertCurrencyReqDTO dto)
        {
            return Ok(service.ConvertCurrency(dto));
        }

        [HttpGet("GetCurrencies")]
        public async Task<ActionResult> GetCurrencies()
        {
            return Ok(service.GetCurrencies());
        }

        [HttpGet("GetNewsFromDb")]
        public ActionResult GetNewsFromDb()
        {
            return Ok(service.GetNewsFromDb());
        }

        [HttpGet("GetCurrencyRates")]
        public async Task<ActionResult> GetCurrencyRates(string currentCurrency)
        {
            var response = service.GetCurrencyRates(currentCurrency);
            return Ok(response);
        }

        [HttpGet("GetCurrencyRatesForThreeMonths")]
        public async Task<ActionResult> GetCurrencyRatesForThreeMonths(string currencies)
        {
            var response = service.GetCurrencyRatesForThreeMonths("currencies");
            return Ok(response);
        }

        [HttpPost("ConvertCurrencyForSpecificDate")]
        public async Task<ActionResult> ConvertCurrencyForSpecificDate(ConvertCurrencyForSpecificDateDTO dto)
        {
            var response = service.ConvertCurrencyForSpecificDate(dto);
            return Ok(response);
        }

    }
}
