using System;

namespace CurrencyConverter.API.CutomResponses;

public class SuccessResponse:CustomResponse
{
    public SuccessResponse()
    {
        StatusCode = (int)CustomResponseStatuses.Success;
        StatusDesc = "Success";
    }
}
