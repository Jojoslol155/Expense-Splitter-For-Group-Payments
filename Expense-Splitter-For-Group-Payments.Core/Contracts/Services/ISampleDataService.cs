using Expense_Splitter_For_Group_Payments.Core.Models;

namespace Expense_Splitter_For_Group_Payments.Core.Contracts.Services;

// Remove this class once your pages/features are using your data.
public interface IDataService
{
    Task<IEnumerable<Expense>> GetExpensesAsync();

    Task<IEnumerable<ExpenseGroup>> GetExpenseGroupsAsync();

    Task<IEnumerable<User>> GetUsersAsync();
}
