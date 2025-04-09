using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.ExpenseGroup
{
    public class CreateExpenseGroupReqDTO
    {
        public string Name { get; set; } = string.Empty;
        public int UserID { get; set; } 
        public List<int> MemberIDs { get; set; } = new();
    }
}