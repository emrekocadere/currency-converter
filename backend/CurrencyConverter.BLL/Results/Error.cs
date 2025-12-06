namespace CurrencyConverter.BLL.Results;

public record Error(string Code, string Description)
{
      public static readonly Error None = new(string.Empty, string.Empty);
}

public static class Errors
{
      public static Error AccountNotFound { get; } = new("AccountNotFound", "Account not found.");
      public static Error InsufficientFunds { get; } = new("InsufficientFunds", "Insufficient balance.");
      public static Error NotSavedToDb { get; } = new("NotSaveToDb", "NotSaveToDb.");
}