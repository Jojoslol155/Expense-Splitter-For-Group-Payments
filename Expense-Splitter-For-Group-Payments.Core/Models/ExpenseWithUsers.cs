using Newtonsoft.Json.Linq;

namespace Expense_Splitter_For_Group_Payments.Core.Models;

public class ExpenseWithUsers : Expense
{
    public List<string> MemberNames
    {
        get; set;
    }

    public List<double> MemberPercentages
    {
        get; set;
    }

    public string FormattedAmount(double amt = -1)
    {
        if (amt < 0)
        {
            return string.Format("{0:c}", Amount);
        }
        return string.Format("{0:c}", amt);
    }

    public List<string> MemberAmountsFormatted
    {
        get; set;
    }

    public string AmountForMember(string memberID)
    {
        return FormattedAmount(MemberIDPercentageMap[memberID] * Amount);
    }


}