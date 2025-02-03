using System;

namespace CurrencyConverter.API.CutomResponses;

public class NotFoundOnDb:CustomResponse
{
    public NotFoundOnDb()
    {
        StatusCode = (int)CustomResponseStatuses.NotFoundOnDb;
        StatusDesc = "Not found on database.";
    }
}
