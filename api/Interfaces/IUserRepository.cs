using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIDAsync(int id);
        Task<User> CreateAsync(User userModel);
        Task<bool> UserExists(int id);
    }
}