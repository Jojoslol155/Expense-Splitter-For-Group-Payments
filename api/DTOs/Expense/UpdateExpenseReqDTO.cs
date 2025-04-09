using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Expense
{
    public class UpdateExpenseReqDTO
    {
        public string Name { get; set; } = string.Empty; 
        
        public decimal Amount { get; set; }
    }
}