namespace Expense_Splitter_For_Group_Payments.Core.Models;

public class ExpenseGroup
{
    public string ID
    {
        get; set;
    }

    public string Name
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

    public ICollection<Expense> Expenses
    {
        get; set;
    }

    public ICollection<User> Members
    {
        get; set;
    }
}
