using Expense_Splitter_For_Group_Payments.Core.Models;

using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace Expense_Splitter_For_Group_Payments.Views;

public sealed partial class ExpenseDetailControl : UserControl
{
    public ExpenseWithUsers? ListDetailsMenuItem
    {
        get => GetValue(ListDetailsMenuItemProperty) as ExpenseWithUsers;
        set => SetValue(ListDetailsMenuItemProperty, value);
    }

    public static readonly DependencyProperty ListDetailsMenuItemProperty = DependencyProperty.Register("ListDetailsMenuItem", typeof(ExpenseWithUsers), typeof(ExpenseDetailControl), new PropertyMetadata(null, OnListDetailsMenuItemPropertyChanged));

    public ExpenseDetailControl()
    {
        InitializeComponent();
    }

    private static void OnListDetailsMenuItemPropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        if (d is ExpenseDetailControl control)
        {
            control.ForegroundElement.ChangeView(0, 0, 1);
        }
    }
}
