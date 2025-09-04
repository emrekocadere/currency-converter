using System;

namespace CurrencyConverter.BLL.Results;

public class Result<T>
{
    public bool IsSuccess { get; }
    public Error? Error { get; }
    public T? Value { get; }

    public Result(T value)
    {
        IsSuccess = true;
        Value = value;
        Error = Error.None;
    }
    public Result(Error error)
    {
        IsSuccess = false;
        Error = error;

    }

    public static implicit operator Result<T>(T value) => new(value);

    public static implicit operator Result<T>(Error error) => new(error);
}



