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
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ApplicationDBContext _context;

        public ExpenseRepository(ApplicationDBContext context)
        {
            _context = context;    
        }

        public async Task<Expense> CreateAsync(Expense expenseModel) {
            await _context.Expenses.AddAsync(expenseModel);
            await _context.SaveChangesAsync();
            return expenseModel;
        }
        
        public async Task<List<Expense>> GetAllAsync() {
            return await _context.Expenses
                .Include(e => e.UserExpensePercentages)
                .ToListAsync();
        }

        public async Task<Expense?> GetByIDAsync(int id) {
            return await _context.Expenses
                .Include(e => e.UserExpensePercentages)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<bool> ExpenseExists(int id)
        {
            return await _context.Expenses.AnyAsync(e => e.Id == id);
        }

    }
}