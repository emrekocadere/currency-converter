using CurrencyConverter.BLL.Service;
using Microsoft.AspNetCore.Mvc;

namespace CurrencyConverter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyConverterController(
        ICurrencyConverterService service)
        : ControllerBase
    {

        [HttpGet("exchange")]
        public ActionResult ConvertCurrency(int amount, string currencies)
        {
            var result = service.ConvertCurrency(amount, currencies);
            return Ok(result);
        }

        [HttpGet("currencies")]
        public IActionResult GetCurrencies()
        {
            var result = service.GetCurrencies();
            return Ok(result);
        }


        [HttpGet("currency-rates")]
        public ActionResult GetCurrencyRates(string currency)
        {
            var response = service.GetCurrencyRates(currency);
            return Ok(response);
        }

        [HttpGet("currency-rates/history")]
        public ActionResult GetCurrencyRatesForThreeMonths(string currencies)
        {
            var response = service.GetCurrencyRatesForThreeMonths(currencies);
            return Ok(response);
        }

        [HttpGet("exchange/by-date")]
        public ActionResult ConvertCurrencyForSpecificDate(string date, string currencies, int amount)
        {
            var response = service.ConvertCurrencyForSpecificDate(date, currencies, amount);
            return Ok(response);
        }

        [HttpGet("news")]
        public ActionResult Paginate(int pageNumber)
        {
            return Ok(service.Paginate(pageNumber));
        }

    }
}
