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
        private readonly IExpenseGroupRepository _repo;

        public ExpenseGroupController(ApplicationDBContext context, IExpenseGroupRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var expenseGroups = await _repo.GetAllAsync();

            var expenseGroupDTO = expenseGroups.Select( s => s.ToExpenseGroupDTO());

            return Ok(expenseGroups);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {
            var expenseGroup = await _repo.GetByIDAsync(id);

            if (expenseGroup == null) {
                return NotFound();
            }

            return Ok(expenseGroup.ToExpenseGroupDTO());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateExpenseGroupReqDTO expenseGroupDTO) {
            var expenseGroupModel = expenseGroupDTO.ToExpenseGroupFromCreateDTO();

            await _repo.CreateAsync(expenseGroupModel);

            return CreatedAtAction(nameof(GetById), new { id = expenseGroupModel.Id }, expenseGroupModel.ToExpenseGroupDTO());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExpenseGroupReqDTO expenseGroupDTO) {
            var expenseGroupModel = await _repo.UpdateAsync(id, expenseGroupDTO);

            if (expenseGroupModel == null) {
                return NotFound();
            }

            return Ok(expenseGroupModel.ToExpenseGroupDTO());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id) {
            var expenseGroup = await _repo.DeleteAsync(id);
            
            if (expenseGroup == null) {
                return NotFound();
            }

            return NoContent();
        }
    }
}