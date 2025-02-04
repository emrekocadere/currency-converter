using System;

namespace CurrencyConverter.API.CutomResponses;

public class ExceptionResponse:CustomResponse
{
    public ExceptionResponse(string exceptionMessage)
    {
        StatusCode = (int)CustomResponseStatuses.InternalServerError;
        StatusDesc = exceptionMessage;
    }
}
