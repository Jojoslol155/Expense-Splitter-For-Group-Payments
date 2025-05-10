using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.DTOs.Expense;

namespace api.Interfaces
{
    public interface IExpenseRepository
    {
        Task<List<Expense>> GetAllAsync();
        Task<Expense?> GetByIDAsync(int id);
        Task<Expense> CreateAsync(Expense expenseGroupModel);
        Task<Expense?> UpdateAsync(int id, UpdateExpenseReqDTO expenseDTO);
        Task<Expense?> DeleteAsync(int id);
        Task<bool> ExpenseExists(int id);
    }
}