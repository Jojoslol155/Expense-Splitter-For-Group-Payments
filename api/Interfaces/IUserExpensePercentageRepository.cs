using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.UserExpensePercentage;
using api.Models;

namespace api.Interfaces
{
    public interface IUserExpensePercentageRepository
    {
        Task<UserExpensePercentage> AddUserExpensePercentageAsync(UserExpensePercentage userExpensePercentage);
        Task<List<UserExpensePercentage>> GetAllAsync();
        Task<List<UserExpensePercentage>> GetAllByExpenseIDAsync(int expenseID);
        Task<UserExpensePercentage> UpdateAsync(UserExpensePercentageDTO userExpensePercentageDTO);
        Task<UserExpensePercentage> DeleteAsync(int userID, int expenseID);
    }
}