using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.ExpenseGroup;
using api.Models;

namespace api.Mappers
{
    public static class ExpenseGroupMappers
    {
        public static ExpenseGroupDTO ToExpenseGroupDTO(this ExpenseGroup expenseGroupModel) {
            return new ExpenseGroupDTO{
                Id = expenseGroupModel.Id,
                Name = expenseGroupModel.Name,
                Expenses = expenseGroupModel.Expenses.Select(e => e.ToExpenseDTO()).ToList(),
                Members = expenseGroupModel.GroupMembers.Select(gm => gm.Member.ToUserDTO()).ToList()
            };
        }

        public static ExpenseGroup ToExpenseGroupFromCreateDTO(this CreateExpenseGroupReqDTO expenseGroupDTO) {
            return new ExpenseGroup {
                Name = expenseGroupDTO.Name,
            };
        }
    }
}