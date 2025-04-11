using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Expense
    {
        public int Id { get; set; }

        public int? ExpenseGroupID { get; set; }

        public ExpenseGroup? ExpenseGroup { get; set; }
        
        public string Name { get; set; } = string.Empty; 

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        public List<UserExpensePercentage> UserExpensePercentages { get; set; } = new();
    }
}