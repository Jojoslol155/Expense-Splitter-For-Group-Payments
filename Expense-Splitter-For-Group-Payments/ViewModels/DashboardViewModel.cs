﻿using System.Collections.ObjectModel;
using System.Windows.Input;

using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

using Expense_Splitter_For_Group_Payments.Contracts.Services;
using Expense_Splitter_For_Group_Payments.Contracts.ViewModels;
using Expense_Splitter_For_Group_Payments.Core.Contracts.Services;
using Expense_Splitter_For_Group_Payments.Core.Models;

namespace Expense_Splitter_For_Group_Payments.ViewModels;

public partial class DashboardViewModel : ObservableRecipient, INavigationAware
{
    private readonly INavigationService _navigationService;
    private readonly ISampleDataService _sampleDataService;

    public ObservableCollection<SampleOrder> Source { get; } = new ObservableCollection<SampleOrder>();

    public DashboardViewModel(INavigationService navigationService, ISampleDataService sampleDataService)
    {
        _navigationService = navigationService;
        _sampleDataService = sampleDataService;
    }

    public async void OnNavigatedTo(object parameter)
    {
        Source.Clear();

        // TODO: Replace with real data.
        var data = await _sampleDataService.GetContentGridDataAsync();
        foreach (var item in data)
        {
            Source.Add(item);
        }
    }

    public void OnNavigatedFrom()
    {
    }

    [RelayCommand]
    private void OnItemClick(SampleOrder? clickedItem)
    {
        if (clickedItem != null)
        {
            _navigationService.SetListDataItemForNextConnectedAnimation(clickedItem);
            _navigationService.NavigateTo(typeof(DashboardDetailViewModel).FullName!, clickedItem.OrderID);
        }
    }
}
