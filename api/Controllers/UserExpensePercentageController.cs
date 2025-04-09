using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using api.DTOs;

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

        public async Task<UserExpensePercentage> AddUserExpensePercentageAsync(UserExpensePercentageDTO uePercentageDTO) {
            UserExpensePercentage uePercentage = uePercentageDTO.To
        }
    }
}