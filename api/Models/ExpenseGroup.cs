using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace api.Models
{
    public class ExpenseGroup
    {
        public int Id { get; set; }
        
        public string Name { get; set; } = string.Empty;

        public List<Expense> Expenses { get; set; } = new();

        public List<User> Members {get; set; } = new();
    }
}