using Expense_Splitter_For_Group_Payments.Core.Models;

namespace Expense_Splitter_For_Group_Payments.Core.Contracts.Services;

// Remove this class once your pages/features are using your data.
public interface ISampleDataService
{
    Task<IEnumerable<SampleOrder>> GetListDetailsDataAsync();

    Task<IEnumerable<SampleOrder>> GetContentGridDataAsync();
}
