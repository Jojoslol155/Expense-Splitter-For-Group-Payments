using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class UserExpensePercentage
    {
        public int ExpenseID { get; set; }
        public int UserID { get; set; }
        public double Percentage { get; set; }
        public Expense Expense { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}