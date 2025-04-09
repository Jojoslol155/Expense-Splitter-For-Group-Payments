using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
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

        public async Task<User> CreateAsync(User userModel) {
            await _context.Users.AddAsync(userModel);
            await _context.SaveChangesAsync();
            return userModel;
        }

        public async Task<List<User>> GetAllAsync() {
            return await _context.Users.ToListAsync();
        }
        
        public async Task<User?> GetByIDAsync(int id) {
            return await _context.Users.FindAsync(id);
        }

        public async Task<bool> UserExists(int id) {
            return await _context.Users.AnyAsync(u => u.Id == id);
        }
    }
}