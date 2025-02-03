using System;

namespace CurrencyConverter.API.CutomResponses;

public enum CustomResponseStatuses
{
    Success = 200,
    NotFoundOnDb = 404,
    BadRequest = 400,
    InternalServerError = 500
}
