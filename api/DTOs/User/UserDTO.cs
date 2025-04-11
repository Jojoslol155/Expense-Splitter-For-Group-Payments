using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.UserExpensePercentage;

namespace api.DTOs.User
{
    public class UserDTO
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public List<UserExpensePercentageDTO> UserExpensePercentages { get; set; } = new();
    }
}