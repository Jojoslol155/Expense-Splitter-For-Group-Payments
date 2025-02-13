namespace Expense_Splitter_For_Group_Payments.Core.Models;

public class User
{
    public string UserID
    {
        get; set;
    }

    public string FirstName
    {
        get; set;
    }

    public string LastName
    {
        get; set;
    }

    public double AmountOwed
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

    public string ShortDescription => $"Name: {FirstName} {LastName}";

    public override string ToString() => $"{FirstName} {FirstName} {AmountOwed}";
}
