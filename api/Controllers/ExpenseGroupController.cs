using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Mappers;
using api.DTOs.ExpenseGroup;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/expensegroup")]
    [ApiController]
    public class ExpenseGroupController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ExpenseGroupController(ApplicationDBContext context)
        {
            _context = context;    
        }

        [HttpGet]
        public IActionResult GetAll() {
            var expenseGroups = _context.ExpenseGroups.ToList()
                .Select( s => s.ToExpenseGroupDTO());

            return Ok(expenseGroups);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id) {
            var expenseGroup = _context.ExpenseGroups.Find(id);

            if (expenseGroup == null) {
                return NotFound();
            }

            return Ok(expenseGroup.ToExpenseGroupDTO());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateExpenseGroupReqDTO expenseGroupDTO) {
            var expenseGroupModel = expenseGroupDTO.ToExpenseGroupFromCreateDTO();

            _context.ExpenseGroups.Add(expenseGroupModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = expenseGroupModel.Id }, expenseGroupModel.ToExpenseGroupDTO());
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateExpenseGroupReqDTO expenseGroupDTO) {
            var expenseGroupModel = _context.ExpenseGroups.FirstOrDefault(eg => eg.Id == id);

            if (expenseGroupModel == null) {
                return NotFound();
            }

            expenseGroupModel.Name = expenseGroupDTO.Name;

            _context.SaveChanges();
            return Ok(expenseGroupModel.ToExpenseGroupDTO());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id) {
            var expenseGroup = _context.ExpenseGroups.FirstOrDefault(eg => eg.Id == id);
            
            if (expenseGroup == null) {
                return NotFound();
            }

            _context.ExpenseGroups.Remove(expenseGroup);
            _context.SaveChanges();

            return NoContent();
        }
    }
}