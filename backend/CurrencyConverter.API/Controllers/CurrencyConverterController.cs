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
        [HttpPost]
        public async Task<ActionResult> currency(ExchangeReqDTO dto)
        {

            return Ok(await service.SendRequest(dto));
        }

        [HttpGet]
        public  ActionResult GetCurrencies( )
        {

            return Ok( service.GetCurrencies());
        }
    }
}
