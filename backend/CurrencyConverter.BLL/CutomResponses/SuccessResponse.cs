using System;

namespace CurrencyConverter.API.CutomResponses;

public class SuccessResponse:CustomResponse
{
    public SuccessResponse()
    {

        StatusDesc = "Success";
    }
}
