namespace Expense_Splitter_For_Group_Payments.Core.Models;

public class ExpenseDetail
{
    public double Total
    {
        get; set;
    }

    public string ShortDescription => $"Expense detail {Total}";
}
