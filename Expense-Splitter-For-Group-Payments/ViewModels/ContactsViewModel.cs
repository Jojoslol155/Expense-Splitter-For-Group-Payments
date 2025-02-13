using System.Collections.ObjectModel;

using CommunityToolkit.Mvvm.ComponentModel;

using Expense_Splitter_For_Group_Payments.Contracts.ViewModels;
using Expense_Splitter_For_Group_Payments.Core.Contracts.Services;
using Expense_Splitter_For_Group_Payments.Core.Models;

namespace Expense_Splitter_For_Group_Payments.ViewModels;

public partial class ContactsViewModel : ObservableRecipient, INavigationAware
{
    private readonly IDataService _DataService;

    [ObservableProperty]
    private User? selected;

    public ObservableCollection<User> SampleItems { get; private set; } = new ObservableCollection<User>();

    public ContactsViewModel(IDataService DataService)
    {
        _DataService = DataService;
    }

    public async void OnNavigatedTo(object parameter)
    {
        SampleItems.Clear();

        // TODO: Replace with real data.
        var data = await _DataService.GetUsersAsync();

        foreach (var item in data)
        {
            SampleItems.Add(item);
        }
    }

    public void OnNavigatedFrom()
    {
    }

    public void EnsureItemSelected()
    {
        Selected ??= SampleItems.First();
    }
}
