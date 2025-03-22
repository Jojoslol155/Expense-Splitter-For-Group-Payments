using CommunityToolkit.Mvvm.ComponentModel;

using Expense_Splitter_For_Group_Payments.Contracts.ViewModels;
using Expense_Splitter_For_Group_Payments.Core.Contracts.Services;
using Expense_Splitter_For_Group_Payments.Core.Models;
using Expense_Splitter_For_Group_Payments.Core.Services;

namespace Expense_Splitter_For_Group_Payments.ViewModels;



public partial class ExpenseDetailViewModel : ObservableRecipient, INavigationAware
{
    private readonly IDataService _dataService;

    [ObservableProperty]
    private ExpenseGroup? item;

    [ObservableProperty]
    private ICollection<ExpenseWithUsers>? expenses;

    [ObservableProperty]
    private ExpenseWithUsers? selected;

    public ExpenseDetailViewModel(IDataService dataService)
    {
        _dataService = dataService;
    }

    public async void OnNavigatedTo(object parameter)
    {
        Console.WriteLine("naved to!!");
        if (parameter is string expenseGroupID)
        {
            ICollection<ExpenseWithUsers> expensesWithUsers = new List<ExpenseWithUsers>();

            var exp = await _dataService.GetExpenseGroupsAsync();
            Item = exp.First(i => i.ID == expenseGroupID);
            ICollection<Expense> getExpenses = Item.Expenses;

            var users = await _dataService.GetUsersAsync();

            Console.WriteLine("got users!");
            Console.Write(users);

            
            foreach (var expense in getExpenses)
            {
                ExpenseWithUsers expenseWithUsers = new();
                expenseWithUsers.MemberNames = new List<string>();
                expenseWithUsers.MemberPercentages = new List<double>();
                expenseWithUsers.MemberAmountsFormatted = new List<string>();


                foreach (var userID in expense.MemberIDPercentageMap.Keys) {
                    double percentage = expense.MemberIDPercentageMap[userID];

                    User user = users.First(i => i.UserID == userID);
                    string fullName = user.FullName;

                    expenseWithUsers.ID = expense.ID;
                    expenseWithUsers.Name = expense.Name;
                    expenseWithUsers.Amount = expense.Amount;
                    expenseWithUsers.SymbolName = expense.SymbolName;
                    expenseWithUsers.SymbolCode = expense.SymbolCode;
                    expenseWithUsers.MemberIDPercentageMap = expense.MemberIDPercentageMap;
                    
                    
                    expenseWithUsers.MemberNames.Add(fullName);
                    expenseWithUsers.MemberPercentages.Add(percentage);
                    expenseWithUsers.MemberAmountsFormatted.Add(expenseWithUsers.AmountForMember(userID));
                }

                expensesWithUsers.Add(expenseWithUsers);
            }

            Expenses = expensesWithUsers;
        }
    }

    public void OnNavigatedFrom()
    {
    }

    public void EnsureItemSelected()
    {
        Selected ??= Expenses.First();
    }
}
