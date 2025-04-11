using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;

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
    }
}