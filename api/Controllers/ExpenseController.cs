using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/expense")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseRepository _repo;

        public ExpenseController(IExpenseRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var expenses = await _repo.GetAllAsync();

            var expenseDto = expenses.Select(e => e.ToExpenseDTO());

            return Ok(expenseDto);
        }
    }
}