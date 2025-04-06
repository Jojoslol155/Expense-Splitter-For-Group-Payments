using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using api.DTOs.ExpenseGroup;

namespace api.Repository
{
    public class ExpenseGroupRepository : IExpenseGroupRepository
    {
        private readonly ApplicationDBContext _context;
        
        public ExpenseGroupRepository(ApplicationDBContext context) {
            _context = context;
        }

        public async Task<ExpenseGroup> CreateAsync(ExpenseGroup expenseGroupModel) {
            await _context.ExpenseGroups.AddAsync(expenseGroupModel);
            await _context.SaveChangesAsync();

            return expenseGroupModel;
        }

        public async Task<List<ExpenseGroup>> GetAllAsync() {
            return await _context.ExpenseGroups.ToListAsync();
        }

        public async Task<ExpenseGroup?> GetByIDAsync(int id) {
            return await _context.ExpenseGroups.FindAsync(id);
        }


        public async Task<ExpenseGroup?> DeleteAsync(int id)  {
            var expenseGroupModel = await _context.ExpenseGroups.FirstOrDefaultAsync(eg => eg.Id == id);

            if (expenseGroupModel == null) {
                return null;
            }

            _context.ExpenseGroups.Remove(expenseGroupModel);
            await _context.SaveChangesAsync();
            return expenseGroupModel;
        }


        public async Task<ExpenseGroup?> UpdateAsync(int id, UpdateExpenseGroupReqDTO expenseGroupDTO) {
            var existingExpenseGroup = await _context.ExpenseGroups.FirstOrDefaultAsync(eg => eg.Id == id);

            if (existingExpenseGroup == null) {
                return null;
            }

            existingExpenseGroup.Name = expenseGroupDTO.Name;
            
            await _context.SaveChangesAsync();
            return existingExpenseGroup;
        }
    }
}