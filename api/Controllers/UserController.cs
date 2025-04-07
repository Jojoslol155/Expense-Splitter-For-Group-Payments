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

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var users = await _repo.GetAllAsync();

            var userDTO = users.Select(u => u.ToUserDTO());

            return Ok(userDTO);
        }
    }
}