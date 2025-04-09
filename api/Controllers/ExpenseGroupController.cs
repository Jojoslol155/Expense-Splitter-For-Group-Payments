using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Mappers;
using api.DTOs.ExpenseGroup;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Interfaces;

namespace api.Controllers
{
    [Route("api/expensegroup")]
    [ApiController]
    public class ExpenseGroupController : ControllerBase
    {
        private readonly IExpenseGroupRepository _expenseGroupRepo;
        private readonly IUserRepository _userRepo;

        public ExpenseGroupController(IExpenseGroupRepository expenseRepo, IUserRepository userRepo)
        {
            _expenseGroupRepo = expenseRepo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateExpenseGroupReqDTO expenseGroupDTO) {
            var expenseGroupModel = expenseGroupDTO.ToExpenseGroupFromCreateDTO();

            await _expenseGroupRepo.CreateAsync(expenseGroupModel);

            return CreatedAtAction(nameof(GetById), new { id = expenseGroupModel.Id }, expenseGroupModel.ToExpenseGroupDTO());
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var expenseGroups = await _expenseGroupRepo.GetAllAsync();

            var expenseGroupDTO = expenseGroups.Select( s => s.ToExpenseGroupDTO());

            return Ok(expenseGroupDTO);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {
            var expenseGroup = await _expenseGroupRepo.GetByIDAsync(id);

            if (expenseGroup == null) {
                return NotFound();
            }

            return Ok(expenseGroup.ToExpenseGroupDTO());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExpenseGroupReqDTO expenseGroupDTO) {
            var expenseGroupModel = await _expenseGroupRepo.UpdateAsync(id, expenseGroupDTO);

            if (expenseGroupModel == null) {
                return NotFound();
            }

            return Ok(expenseGroupModel.ToExpenseGroupDTO());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id) {
            var expenseGroup = await _expenseGroupRepo.DeleteAsync(id);
            
            if (expenseGroup == null) {
                return NotFound();
            }

            return NoContent();
        }
    }
}