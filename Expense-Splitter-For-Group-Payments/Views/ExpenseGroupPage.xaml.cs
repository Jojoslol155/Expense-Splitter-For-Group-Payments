using CommunityToolkit.WinUI.UI.Controls;

using Expense_Splitter_For_Group_Payments.ViewModels;

using Microsoft.UI.Xaml.Controls;

namespace Expense_Splitter_For_Group_Payments.Views;

public sealed partial class ExpenseGroupPage : Page
{
    public ExpenseGroupViewModel ViewModel
    {
        get;
    }

    public ExpenseGroupPage()
    {
        ViewModel = App.GetService<ExpenseGroupViewModel>();
        InitializeComponent();
    }

    private void OnViewStateChanged(object sender, ListDetailsViewState e)
    {
        if (e == ListDetailsViewState.Both)
        {
            ViewModel.EnsureItemSelected();
        }
    }
}
