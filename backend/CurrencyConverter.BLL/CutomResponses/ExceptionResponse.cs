using System;

namespace CurrencyConverter.API.CutomResponses;

public class ExceptionResponse:CustomResponse
{
    public ExceptionResponse(string exceptionMessage)
    {

        StatusDesc = exceptionMessage;
    }
}
