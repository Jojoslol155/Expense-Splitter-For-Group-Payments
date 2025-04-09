using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Mappers;
using api.DTOs.GroupMember;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/groupmembers")]
    [ApiController]
    public class GroupMemberController : ControllerBase
    {
        private readonly IExpenseGroupRepository _expenseGroupRepo;
        private readonly IUserRepository _userRepo;
        private readonly IGroupMemberRepository _groupMemberRepo;

        public GroupMemberController(IExpenseGroupRepository expenseGroupRepo, IUserRepository userRepo, IGroupMemberRepository groupMemberRepo)
        {
            _expenseGroupRepo = expenseGroupRepo;
            _userRepo = userRepo;
            _groupMemberRepo = groupMemberRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddGroupMember([FromBody] GroupMemberDTO groupMemberDTO) {
            var groupMemberModel = groupMemberDTO.ToGroupMemberFromDTO(); // TODO don't need this??

            if (!await _expenseGroupRepo.ExpenseGroupExists(groupMemberDTO.ExpenseGroupID)) {
                return BadRequest("Expense group does not exist");
            }
            if (!await _userRepo.UserExists(groupMemberDTO.MemberID)) {
                return BadRequest("User does not exist");
            }

            await _groupMemberRepo.AddGroupMemberAsync(groupMemberModel);

            return null; //TODO: return expense group data??
        }

    }
}