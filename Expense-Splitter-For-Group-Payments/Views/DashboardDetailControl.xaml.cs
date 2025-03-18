using Expense_Splitter_For_Group_Payments.Core.Models;

using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace Expense_Splitter_For_Group_Payments.Views;

public sealed partial class DashboardDetailControl : UserControl
{
    public Expense? ListDetailsMenuItem
    {
        get => GetValue(ListDetailsMenuItemProperty) as Expense;
        set => SetValue(ListDetailsMenuItemProperty, value);
    }

    public static readonly DependencyProperty ListDetailsMenuItemProperty = DependencyProperty.Register("ListDetailsMenuItem", typeof(Expense), typeof(DashboardDetailControl), new PropertyMetadata(null, OnListDetailsMenuItemPropertyChanged));

    public DashboardDetailControl()
    {
        InitializeComponent();
    }

    private static void OnListDetailsMenuItemPropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        if (d is DashboardDetailControl control)
        {
            control.ForegroundElement.ChangeView(0, 0, 1);
        }
    }
}
