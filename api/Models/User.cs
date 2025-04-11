using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class User
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public List<GroupMember> GroupMembers { get; set; } = new();

        public List<UserExpensePercentage> UserExpensePercentages { get; set; } = new();
    }
}