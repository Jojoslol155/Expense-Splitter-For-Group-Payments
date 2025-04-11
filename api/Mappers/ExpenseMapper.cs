using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Expense;
using api.Models;

namespace api.Mappers
{
    public static class ExpenseMapper
    {
        public static ExpenseDTO ToExpenseDTO(this Expense expenseModel) {
            return new ExpenseDTO {
                Id = expenseModel.Id,
                Name = expenseModel.Name,
                Amount = expenseModel.Amount,
                ExpenseGroupID = expenseModel.ExpenseGroupID,
                UserExpensePercentages = expenseModel.UserExpensePercentages.Select(uep => uep.ToUserExpensePercentageDTO()).ToList()
            };
        }

        public static Expense ToExpenseFromCreateDTO(this CreateExpenseReqDTO expenseDTO, int expenseGroupID) {
            return new Expense {
                Name = expenseDTO.Name,
                Amount = expenseDTO.Amount,
                ExpenseGroupID = expenseGroupID,
            };
        }
    }
}