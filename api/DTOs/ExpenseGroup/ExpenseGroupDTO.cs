using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.ExpenseGroup
{
    public class ExpenseGroupDTO
    {
        public int Id { get; set; }
        
        public string Name { get; set; } = string.Empty;
    }
}