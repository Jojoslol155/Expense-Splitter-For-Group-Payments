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

        public async Task<UserExpensePercentage> UpdateAsync(UserExpensePercentageDTO userExpensePercentageDTO)
        {
            var existingUEP = await _context.UserExpensePercentages.FirstOrDefaultAsync(uep => uep.ExpenseID == userExpensePercentageDTO.ExpenseID && uep.UserID == userExpensePercentageDTO.UserID);
            if (existingUEP == null) {
                return null;
            }

            existingUEP.FirstName = userExpensePercentageDTO.FirstName;
            existingUEP.Percentage = userExpensePercentageDTO.Percentage;

            await _context.SaveChangesAsync();
            return existingUEP;
        }

        public async Task<UserExpensePercentage> DeleteAsync(string userID, int expenseID) {
            var uepModel = await _context.UserExpensePercentages.FirstOrDefaultAsync(uep => uep.UserID == userID && uep.ExpenseID == expenseID);

            if (uepModel == null) {
                return null;
            }

            _context.UserExpensePercentages.Remove(uepModel);
            await _context.SaveChangesAsync();
            return uepModel;
        }
    }
}