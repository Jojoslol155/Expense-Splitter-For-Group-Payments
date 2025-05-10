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
        private readonly IUserExpensePercentageRepository _uepRepo;

        public ExpenseController(IExpenseRepository expenseRepo, IExpenseGroupRepository expenseGroupRepo)
        {
            _expenseRepo = expenseRepo;
            _expenseGroupRepo = expenseGroupRepo;
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

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id) {
            var getExpense = await _expenseRepo.GetByIDAsync(id);

            if (getExpense == null) {
                return NotFound();
            }

            for (var i = 0; id < getExpense.UserExpensePercentages.Count; id++) {
                await _uepRepo.DeleteAsync(id, getExpense.UserExpensePercentages[i].UserID);
            }
            
            await _expenseRepo.DeleteAsync(id);

            return NoContent();
        }

    }
}