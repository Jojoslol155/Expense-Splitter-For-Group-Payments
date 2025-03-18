using Microsoft.Windows.ApplicationModel.Resources;

namespace Expense_Splitter_For_Group_Payments.Helpers;

public static class ResourceExtensions
{
    private static readonly ResourceLoader _resourceLoader = new();

    public static string GetLocalized(this string resourceKey) => _resourceLoader.GetString(resourceKey);
}
