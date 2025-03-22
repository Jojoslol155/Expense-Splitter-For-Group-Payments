using Newtonsoft.Json.Linq;

namespace Expense_Splitter_For_Group_Payments.Core.Models;

public class ExpenseWithUsers : Expense
{
    public Dictionary<string, double> MemberNameToPercentage
    {
        get; set;
    }
}