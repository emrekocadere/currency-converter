using CurrencyConverter.API.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            return Ok(await service.ConvertCurrency(dto));
        }

        [HttpGet("GetCurrencies")]
        public ActionResult GetCurrencies()
        {
            return Ok(service.GetCurrencies());
        }

        [HttpGet("GetNewsFromDb")]
        public ActionResult GetNewsFromDb()
        {
            return Ok(service.GetNewsFromDb());
        }

        [HttpPost("GetConvertCurrencyRates")]
        public async Task<ActionResult> GetConvertCurrencyRates(GetCurrencyRatesDTO dto)
        {
            var response = await service.GetCurrencyRates(dto);
            return Ok(response);
        }
    }
}
