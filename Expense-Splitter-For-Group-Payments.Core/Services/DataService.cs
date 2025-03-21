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
            },
            new ()
            {
                UserID = "7PWL4",
                FirstName = "Daisy",
                LastName = "Duck",
            },
            new ()
            {
                UserID = "J8923",
                FirstName = "Betty",
                LastName = "Boop",
            },
            new ()
            {
                UserID = "5T48L",
                FirstName = "Prince",
                LastName = "Bambi",
            },
            new ()
            {
                UserID = "99OP3",
                FirstName = "Mister",
                LastName = "Rogers",
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
                        Amount = 15.43,
                        MemberPercentageMap = new Dictionary<string, double>(){
                            {"H7283", .25 },
                            {"7PWL4", .25 },
                            {"J8923", .25 },
                            {"5T48L", .25 },
                        }
                    },
                    new Expense()
                    {
                        ID = "10835", // Symbol Music
                        Name = "Pencil Sharpeners",
                        SymbolCode = 57737,
                        SymbolName = "Audio",
                        Amount = 5.90,
                        MemberPercentageMap = new Dictionary<string, double>(){
                            {"7PWL4", .5 },
                            {"J8923", .5 },
                        }
                    },
                    new Expense()
                    {
                        ID = "10952", // Symbol Calendar
                        Name = "College-ruled paper",
                        SymbolCode = 57699,
                        SymbolName = "Calendar",
                        Amount = 10.99,
                        MemberPercentageMap = new Dictionary<string, double>(){
                            {"7PWL4", .33 },
                            {"J8923", .33 },
                            {"5T48L", .34 },
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
                        Amount = 12.50,
                        MemberPercentageMap = new Dictionary<string, double>(){
                            {"5T48L", .5 },
                            {"99OP3", .5 },
                        }
                    },
                    new Expense()
                    {
                        ID = "10926", // Symbol Clock
                        Name = "Doritos",
                        SymbolCode = 57633,
                        SymbolName = "Clock",
                        Amount = 10.00,
                        MemberPercentageMap = new Dictionary<string, double>(){
                            {"5T48L", .5 },
                            {"99OP3", .5 },
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
