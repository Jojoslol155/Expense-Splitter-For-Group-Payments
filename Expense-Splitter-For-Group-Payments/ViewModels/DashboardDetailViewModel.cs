using CommunityToolkit.Mvvm.ComponentModel;

using Expense_Splitter_For_Group_Payments.Contracts.ViewModels;
using Expense_Splitter_For_Group_Payments.Core.Contracts.Services;
using Expense_Splitter_For_Group_Payments.Core.Models;

namespace Expense_Splitter_For_Group_Payments.ViewModels;

public partial class DashboardDetailViewModel : ObservableRecipient, INavigationAware
{
    private readonly IDataService _dataService;

    [ObservableProperty]
    private ExpenseGroup? item;

    [ObservableProperty]
    private ICollection<Expense>? expenses;

    [ObservableProperty]
    private Expense? selected;

    public DashboardDetailViewModel(IDataService dataService)
    {
        _dataService = dataService;
    }

    public async void OnNavigatedTo(object parameter)
    {
        if (parameter is string expenseGroupID)
        {
            var data = await _dataService.GetExpenseGroupsAsync();
            Item = data.First(i => i.ID == expenseGroupID);

            Expenses = Item.Expenses;
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
