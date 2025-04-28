using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.DTOs.User;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIDAsync(string id);
        Task<bool> UserExists(string id);
        Task<User?> UpdateAsync(string id, UpdateUserReqDTO userDTO);
        Task<User?> DeleteAsync(string id);
    }
}