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
        private readonly CurrencyConverterService _service;
        public CurrencyConverterController(CurrencyConverterService service)
        {
            _service = service;
        }
        [HttpGet("exchange")]
        public ActionResult ConvertCurrency(ConvertCurrencyReqDTO dto)
        {
            return Ok(_service.ConvertCurrency(dto));
        }

        [HttpGet("currencies")]
        public ActionResult GetCurrencies()
        {
            return Ok(_service.GetCurrencies());
        }

        [HttpGet("news")]
        public ActionResult GetNewsFromDb()
        {
            return Ok(_service.GetNewsFromDb());
        }

        [HttpGet("currency-rates")]
        public ActionResult GetCurrencyRates(string currentCurrency)
        {
            var response = _service.GetCurrencyRates(currentCurrency);
            return Ok(response);
        }

        [HttpGet("currency-rates/history")]
        public ActionResult GetCurrencyRatesForThreeMonths(string currencies)
        {
            var response = _service.GetCurrencyRatesForThreeMonths(currencies);
            return Ok(response);
        }

        [HttpPost("exchange/by-date")]
        public ActionResult ConvertCurrencyForSpecificDate(ConvertCurrencyForSpecificDateDTO dto)
        {
            var response = _service.ConvertCurrencyForSpecificDate(dto);
            return Ok(response);
        }


        [HttpGet("news")]
        public ActionResult Paginate(int pageNumber, int pageSize)
        {
            return Ok(_service.Paginate(pageNumber));
        }


        [HttpPost("user-locations")]
        public ActionResult SaveUserLocation(UserLocationDTO dto)
        {
            var response = _service.SaveUserLocation(dto);
            return Ok(response);
        }
    }
}
