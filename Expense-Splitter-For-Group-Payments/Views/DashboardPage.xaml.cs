using Expense_Splitter_For_Group_Payments.ViewModels;

using Microsoft.UI.Xaml.Controls;

namespace Expense_Splitter_For_Group_Payments.Views;

public sealed partial class DashboardPage : Page
{
    public DashboardViewModel ViewModel
    {
        get;
    }

    public DashboardPage()
    {
        ViewModel = App.GetService<DashboardViewModel>();
        InitializeComponent();
    }
}
