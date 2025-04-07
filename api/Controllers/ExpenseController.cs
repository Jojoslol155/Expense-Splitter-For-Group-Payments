using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using api.DTOs.Expense;
using api.Repository;

namespace api.Controllers
{
    [Route("api/expense")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseRepository _expenseRepo;
        private readonly IExpenseGroupRepository _expenseGroupRepo;

        public ExpenseController(IExpenseRepository expenseRepo, IExpenseGroupRepository expenseGroupRepo)
        {
            _expenseRepo = expenseRepo;
            _expenseGroupRepo = expenseGroupRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var expenses = await _expenseRepo.GetAllAsync();

            var expenseDto = expenses.Select(e => e.ToExpenseDTO());

            return Ok(expenseDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID([FromRoute] int id) {
            var expense = await _expenseRepo.GetByIDAsync(id);

            if (expense == null) {
                return NotFound();
            }

            return Ok(expense.ToExpenseDTO());
        }

        [HttpPost("{expenseGroupID}")]
        public async Task<IActionResult> Create([FromRoute] int expenseGroupID, CreateExpenseReqDTO dto) {
            if (!await _expenseGroupRepo.ExpenseGroupExists(expenseGroupID)) {
                return BadRequest("Expense group does not exist");
            }

            var expenseModel = dto.ToExpenseFromCreateDTO(expenseGroupID);
            await _expenseRepo.CreateAsync(expenseModel);
            return CreatedAtAction(nameof(GetByID), new { id = expenseModel }, expenseModel.ToExpenseDTO());
        }
    }
}