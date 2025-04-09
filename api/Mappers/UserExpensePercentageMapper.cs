using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.UserExpensePercentage;
using api.Models;

namespace api.Mappers
{
    public static class UserExpensePercentageMapper
    {
        public static UserExpensePercentageDTO ToUserExpensePercentageDTO(this UserExpensePercentage uePercentageModel) {
            return new UserExpensePercentageDTO {
                ExpenseID = uePercentageModel.ExpenseID,
                UserID = uePercentageModel.UserID,
                Percentage = uePercentageModel.Percentage
            };
        }

        public static UserExpensePercentage ToUserExpensePercentageFromDTO(this UserExpensePercentageDTO uePercentageDTO) {
            return new UserExpensePercentage {
                ExpenseID = uePercentageDTO.ExpenseID,
                UserID = uePercentageDTO.UserID,
                Percentage = uePercentageDTO.Percentage,
            };
        }
    }
}