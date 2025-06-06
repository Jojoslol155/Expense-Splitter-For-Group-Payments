using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class User : IdentityUser
    {
        // public int Id { get; set; }
        
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        // public string Username { get; set; }

        public List<GroupMember> GroupMembers { get; set; } = new();

        public List<UserExpensePercentage> UserExpensePercentages { get; set; } = new();

    }
}