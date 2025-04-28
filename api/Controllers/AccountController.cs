using System;
using System.Collections.Generic;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using api.DTOs.Account;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase {
        private readonly UserManager<User> _userManager;
        public AccountController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO) {
            try {
                if (!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }
                var user = new User {
                    FirstName = registerDTO.FirstName,
                    LastName = registerDTO.LastName,
                    Email = registerDTO.Email,
                    UserName = registerDTO.UserName,
                };

                var createdUser = await _userManager.CreateAsync(user, registerDTO.Password);

                if (createdUser.Succeeded) {
                    return Ok("User created");
                } else {
                    return StatusCode(500, createdUser.Errors);
                }
            } catch (Exception e) {
                return StatusCode(500, e);
            }
        }
    }
}