using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.DTOs.Expense
{
    public class ExpenseDTO
    {
        public int Id { get; set; }

        public int? ExpenseGroupID { get; set; }

        public string Name { get; set; } = string.Empty; 
        
        public decimal Amount { get; set; }
    }
}