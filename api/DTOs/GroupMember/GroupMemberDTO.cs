using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.GroupMember
{
    public class GroupMemberDTO
    {
        public int ExpenseGroupID { get; set; }
        public string MemberID { get; set; } = string.Empty;
    }
}