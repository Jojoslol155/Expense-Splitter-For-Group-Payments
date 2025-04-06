using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.ExpenseGroup
{
    public class ExpenseGroupDTO
    {
        public int Id { get; set; }

        public int? ExpenseGroupID { get; set; }
        
        public string Name { get; set; } = string.Empty; 

        public decimal Amount { get; set; }
    }
}