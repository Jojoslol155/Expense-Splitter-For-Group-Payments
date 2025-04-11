using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.UserExpensePercentage
{
    public class UserExpensePercentageDTO
    {
        public int ExpenseID { get; set; }
        public int UserID { get; set; }
        public double Percentage { get; set; }
        public string FirstName { get; set; } = string.Empty;
    }
}