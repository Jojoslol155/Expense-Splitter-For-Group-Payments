using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using api.DTOs.UserExpensePercentage;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/percentages")]
    [ApiController]
    public class UserExpensePercentageController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepo;
        private readonly IUserRepository _userRepo;
        private readonly IUserExpensePercentageRepository _percentageRepo;

        public UserExpensePercentageController(IExpenseRepository expenseRepo, IUserRepository userRepo, IUserExpensePercentageRepository percentageRepo)
        {
            _expenseRepo = expenseRepo;
            _userRepo = userRepo;
            _percentageRepo = percentageRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddUserExpensePercentageAsync([FromBody] UserExpensePercentageDTO uePercentageDTO) {
            UserExpensePercentage uePercentage = uePercentageDTO.ToUserExpensePercentageFromDTO();

            if (!await _expenseRepo.ExpenseExists(uePercentageDTO.ExpenseID)) {
                return BadRequest("Expense does not exist");
            }
            if (!await _userRepo.UserExists(uePercentageDTO.UserID)) {
                return BadRequest("User does not exist");
            }

            var expense = await _expenseRepo.GetByIDAsync(uePercentage.ExpenseID);

            var user = await _userRepo.GetByIDAsync(uePercentage.UserID);

            if (expense != null && user != null) {
                uePercentage.Expense = expense;
                uePercentage.User = user;

                await _percentageRepo.AddUserExpensePercentageAsync(uePercentage);
            }

            return Ok(uePercentage);
        }
    }
}