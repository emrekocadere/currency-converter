using System;

namespace CurrencyConverter.API.CutomResponses;

public class NotSavedToDb:CustomResponse
{
    public NotSavedToDb()
    {
        StatusCode = (int)CustomResponseStatuses.InternalServerError;
        StatusDesc = "The news could not be saved to the database";
    }
}
