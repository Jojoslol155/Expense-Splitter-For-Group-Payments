using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.User;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDBContext _context;

        public UserRepository(ApplicationDBContext context) {
            _context = context; 
        }

        public async Task<List<User>> GetAllAsync() {
            return await _context.Users.ToListAsync();
        }
        
        public async Task<User?> GetByIDAsync(string id) {
            return await _context.Users.FindAsync(id);
        }

        public async Task<bool> UserExists(string id) {
            return await _context.Users.AnyAsync(u => u.Id == id);
        }

        public async Task<User?> DeleteAsync(string id)  {
            var userModel = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (userModel == null) {
                return null;
            }

            _context.Users.Remove(userModel);
            await _context.SaveChangesAsync();
            return userModel;
        }

        public async Task<User?> UpdateAsync(string id, UpdateUserReqDTO userDTO) {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (existingUser == null) {
                return null;
            }
            bool nameChanged = existingUser.FirstName != userDTO.FirstName;

            existingUser.FirstName = userDTO.FirstName;
            existingUser.LastName = userDTO.LastName;
            existingUser.Email = userDTO.Email;

                if(nameChanged){
                var updateUeTable = await _context.UserExpensePercentages.Where(p => p.UserID == id).ToListAsync();
                foreach (var entry in updateUeTable){
                    entry.FirstName = userDTO.FirstName;
                }
             }

            await _context.SaveChangesAsync();
            return existingUser;
        }

    }
}