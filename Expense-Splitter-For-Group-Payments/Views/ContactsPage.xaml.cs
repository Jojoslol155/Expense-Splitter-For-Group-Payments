using CommunityToolkit.WinUI.UI.Controls;

using Expense_Splitter_For_Group_Payments.ViewModels;

using Microsoft.UI.Xaml.Controls;

namespace Expense_Splitter_For_Group_Payments.Views;

public sealed partial class ContactsPage : Page
{
    public ContactsViewModel ViewModel
    {
        get;
    }

    public ContactsPage()
    {
        ViewModel = App.GetService<ContactsViewModel>();
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
