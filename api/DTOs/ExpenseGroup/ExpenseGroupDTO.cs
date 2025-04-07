using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Expense;
using api.DTOs.User;
using api.Models;

namespace api.DTOs.ExpenseGroup
{
    public class ExpenseGroupDTO
    {
        public int Id { get; set; }

        public int? ExpenseGroupID { get; set; }
        
        public string Name { get; set; } = string.Empty; 

        public decimal Amount { get; set; }

        public List<ExpenseDTO> Expenses { get; set; } = new();

        public List<UserDTO> Members { get; set; } = new();
    }
}