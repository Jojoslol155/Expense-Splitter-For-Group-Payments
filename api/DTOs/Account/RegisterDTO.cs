using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Account {
    public class RegisterDTO {
        [Required]
        public string? FirstName { get; set; }

        [Required]
        public required string? LastName { get; set; }

        [Required]
        public required string? UserName { get; set; }
        
        [Required]
        [EmailAddress]
        public required string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}