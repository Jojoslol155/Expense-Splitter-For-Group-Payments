namespace Expense_Splitter_For_Group_Payments.Core.Models;

public class Expense
{
    public string ID
    {
        get; set;
    }
    public string Name
    {
        get; set;
    }
    public double Amount
    {
        get; set;
    }

    public int SymbolCode
    {
        get; set;
    }

    public string SymbolName
    {
        get; set;
    }

    public char Symbol => (char)SymbolCode;

    public ICollection<ExpenseDetail> Details
    {
        get; set;
    }

    public ICollection<User> Members
    {
        get; set;
    }

    public string ShortDescription => $"Order ID: {ID}";

    public override string ToString() => $"{Name} {Amount}";
}
