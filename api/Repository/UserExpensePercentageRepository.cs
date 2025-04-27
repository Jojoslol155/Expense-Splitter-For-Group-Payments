using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using api.DTOs.UserExpensePercentage;

namespace api.Repository
{
    public class UserExpensePercentageRepository : IUserExpensePercentageRepository
    {
        private readonly ApplicationDBContext _context;

        public UserExpensePercentageRepository(ApplicationDBContext context)
        {
            _context = context; 
        }

        public async Task<UserExpensePercentage> AddUserExpensePercentageAsync(UserExpensePercentage userExpensePercentage) {
            await _context.UserExpensePercentages.AddAsync(userExpensePercentage);
            await _context.SaveChangesAsync();

            return userExpensePercentage;
        }

        public async Task<List<UserExpensePercentage>> GetAllAsync()
        {
            return await _context.UserExpensePercentages.ToListAsync();
        }

        public async Task<List<UserExpensePercentage>> GetAllByExpenseIDAsync(int expenseID)
        {
            return await _context.UserExpensePercentages
                .Where(p => p.ExpenseID == expenseID)
                .ToListAsync();
        }

        public Task<UserExpensePercentage> UpdateAsync(int id, UserExpensePercentageDTO userExpensePercentageDTO)
        {
            throw new NotImplementedException();
        }
    }
}