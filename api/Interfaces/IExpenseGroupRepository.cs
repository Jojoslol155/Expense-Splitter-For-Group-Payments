using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.ExpenseGroup;
using api.Models;

namespace api.Interfaces
{
    public interface IExpenseGroupRepository
    {
        Task<List<ExpenseGroup>> GetAllAsync();
        Task<ExpenseGroup?> GetByIDAsync(int id);
        Task<ExpenseGroup> CreateAsync(ExpenseGroup expenseGroupModel);
        Task<ExpenseGroup?> UpdateAsync(int id, UpdateExpenseGroupReqDTO expenseGroupDTO);
        Task<ExpenseGroup?> DeleteAsync(int id);
    }
}