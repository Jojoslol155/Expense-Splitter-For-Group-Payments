namespace Expense_Splitter_For_Group_Payments.Contracts.Services;

public interface IActivationService
{
    Task ActivateAsync(object activationArgs);
}
