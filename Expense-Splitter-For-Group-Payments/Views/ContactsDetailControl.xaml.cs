using Expense_Splitter_For_Group_Payments.Core.Models;

using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace Expense_Splitter_For_Group_Payments.Views;

public sealed partial class ContactsDetailControl : UserControl
{
    public Expense? ListDetailsMenuItem
    {
        get => GetValue(ListDetailsMenuItemProperty) as Expense;
        set => SetValue(ListDetailsMenuItemProperty, value);
    }

    public static readonly DependencyProperty ListDetailsMenuItemProperty = DependencyProperty.Register("ListDetailsMenuItem", typeof(Expense), typeof(ContactsDetailControl), new PropertyMetadata(null, OnListDetailsMenuItemPropertyChanged));

    public ContactsDetailControl()
    {
        InitializeComponent();
    }

    private static void OnListDetailsMenuItemPropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        if (d is ContactsDetailControl control)
        {
            control.ForegroundElement.ChangeView(0, 0, 1);
        }
    }
}
