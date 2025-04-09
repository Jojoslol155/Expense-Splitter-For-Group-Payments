using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class GroupMember
    {
        public int ExpenseGroupID { get; set; }
        public int MemberID { get; set; }
        public ExpenseGroup ExpenseGroup { get; set; } = null!;
        public User Member { get; set; } = null!;
    }
}