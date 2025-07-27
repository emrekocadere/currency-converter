using System;

namespace CurrencyConverter.API.CutomResponses;

public class NotSavedToDb:CustomResponse
{
    public NotSavedToDb()
    {

        StatusDesc = "The news could not be saved to the database";
    }
}
