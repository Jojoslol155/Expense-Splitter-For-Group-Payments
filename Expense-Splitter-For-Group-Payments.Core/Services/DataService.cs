using Expense_Splitter_For_Group_Payments.Core.Contracts.Services;
using Expense_Splitter_For_Group_Payments.Core.Models;

namespace Expense_Splitter_For_Group_Payments.Core.Services;

// This class holds sample data used by some generated pages to show how they can be used.
// TODO: The following classes have been created to display sample data. Delete these files once your app is using real data.
// 1. Contracts/Services/ISampleDataService.cs
// 2. Services/SampleDataService.cs
// 3. Models/SampleCompany.cs
// 4. Models/SampleOrder.cs
// 5. Models/SampleOrderDetail.cs
public class DataService : IDataService
{
    private List<Expense> _allExpenses;
    private List<ExpenseGroup> _allExpenseGroups;
    private List<User> _allContacts;

    public DataService()
    {
    }

    private static IEnumerable<Expense> AllExpenses()
    {
        var expenseGroups = AllExpenseGroups();
        return expenseGroups.SelectMany(c => c.Expenses);
    }

    private static IEnumerable<User> AllContacts()
    {
        return new List<User>()
        {
            new ()
            {
                UserID = "H7283",
                FirstName = "Minnie",
                LastName = "Mouse",
            }
        };
    }

    private static IEnumerable<ExpenseGroup> AllExpenseGroups()
    {
        return new List<ExpenseGroup>()
        {
            new ExpenseGroup()
            {
                ID = "ALFKI",
                Name = "Study Group",
                Expenses = new List<Expense>()
                {
                    new Expense()
                    {
                        ID = "10643",
                        Name = "Coffee",
                        SymbolCode = 57643,
                        SymbolName = "Globe",
                        Details = new List<ExpenseDetail>()
                        {
                            new ExpenseDetail()
                            {
                                Total = 513.00
                            },
                            new ExpenseDetail()
                            {
                                Total = 283.50
                            },
                            new ExpenseDetail()
                            {
                                Total = 18.00
                            }
                        }
                    },
                    new Expense()
                    {
                        ID = "10835", // Symbol Music
                        Name = "Pencil Sharpeners",
                        SymbolCode = 57737,
                        SymbolName = "Audio",
                        Details = new List<ExpenseDetail>()
                        {
                            new ExpenseDetail()
                            {
                                Total = 825.00
                            },
                            new ExpenseDetail()
                            {
                                Total = 20.80
                            }
                        }
                    },
                    new Expense()
                    {
                        ID = "10952", // Symbol Calendar
                        Name = "College-ruled paper",
                        SymbolCode = 57699,
                        SymbolName = "Calendar",
                        Details = new List<ExpenseDetail>()
                        {
                            new ExpenseDetail()
                            {
                                Total = 380.00
                            },
                            new ExpenseDetail()
                            {
                                Total = 91.20
                            }
                        }
                    }
                }
            },
            new ExpenseGroup()
            {
                ID = "A472893R",
                Name = "Boy's Night",
                Expenses = new List<Expense>()
                {
                    new Expense()
                    {
                        ID = "10625", // Symbol Camera
                        Name = "Mountain Dew",
                        SymbolCode = 57620,
                        SymbolName = "Camera",
                        Details = new List<ExpenseDetail>()
                        {
                            new ExpenseDetail()
                            {
                                Total = 69.75
                            },
                            new ExpenseDetail()
                            {
                                Total = 70.00
                            },
                            new ExpenseDetail()
                            {
                                Total = 340.00
                            }
                        }
                    },
                    new Expense()
                    {
                        ID = "10926", // Symbol Clock
                        Name = "Doritos",
                        SymbolCode = 57633,
                        SymbolName = "Clock",
                        Details = new List<ExpenseDetail>()
                        {
                            new ExpenseDetail()
                            {
                                Total = 42.00
                            },
                            new ExpenseDetail()
                            {
                                Total = 60.00
                            },
                            new ExpenseDetail()
                            {
                                Total = 64.40
                            },
                            new ExpenseDetail()
                            {
                                Total = 340.80
                            }
                        }
                    }
                }
            }
        };
    }

    public async Task<IEnumerable<Expense>> GetExpensesAsync()
    {
        _allExpenses ??= new List<Expense>(AllExpenses());

        await Task.CompletedTask;
        return _allExpenses;
    }

    public async Task<IEnumerable<ExpenseGroup>> GetExpenseGroupsAsync()
    {
        _allExpenseGroups ??= new List<ExpenseGroup>(AllExpenseGroups());

        await Task.CompletedTask;
        return _allExpenseGroups;
    }

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        _allContacts ??= new List<User>(AllContacts());

        await Task.CompletedTask;
        return _allContacts;
    }
}
