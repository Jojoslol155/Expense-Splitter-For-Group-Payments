namespace Expense_Splitter_For_Group_Payments.Activation;

public interface IActivationHandler
{
    bool CanHandle(object args);

    Task HandleAsync(object args);
}
