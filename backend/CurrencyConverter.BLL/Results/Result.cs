using System;

namespace CurrencyConverter.BLL.Results;

public record Result<T>:Result
{
    private Result(T value) : base(true, null)
    {
        Value = value;
    }

    private Result(Error error) : base(false, error)
    {
    }

    public T? Value { get; }

    public static implicit operator Result<T>(T value)
    {
        return new Result<T>(value);
    }

    public static implicit operator Result<T>(Error error)
    {
        return new Result<T>(error);
    }
    
}

public record Result(bool IsSuccess, Error? Error)
{
    public static Result Success()
    {
        return new Result(true, null);
    }

    public static Result Failure(Error error)
    {
        return new Result(false, error ?? throw new ArgumentNullException(nameof(error)));
    }

    public static implicit operator Result(Error error)
    {
        return Failure(error);
    }
}


