using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using api.DTOs.User;
using api.Repository;

namespace api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;

        public UserController (IUserRepository userRepo) {
            _repo = userRepo;
        }

        [HttpPost] public async Task<IActionResult> Create([FromBody] CreateUserReqDTO userDTO) {
            var userModel = userDTO.ToUserFromCreateDTO();

            await _repo.CreateAsync(userModel);

return CreatedAtAction(nameof(GetById), new { id = userModel.Id }, userModel.ToUserDTO());
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var users = await _repo.GetAllAsync();

            var userDTO = users.Select(u => u.ToUserDTO());

            return Ok(userDTO);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {
            var user = await _repo.GetByIDAsync(id);

            if (user == null) {
                return NotFound();
            }

            return Ok(user.ToUserDTO());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id) {
            var user = await _repo.DeleteAsync(id);
            
            if (user == null) {
                return NotFound();
            }

            return NoContent();
        }
    }
}