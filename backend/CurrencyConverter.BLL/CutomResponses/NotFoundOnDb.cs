using System;

namespace CurrencyConverter.API.CutomResponses;

public class NotFoundOnDb:CustomResponse
{
    public NotFoundOnDb()
    {

        StatusDesc = "Not found on database.";
    }
}
