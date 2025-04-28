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
            var groupMemberModel = groupMemberDTO.ToGroupMemberFromDTO(); // TODO maybe don't need this??

            if (!await _expenseGroupRepo.ExpenseGroupExists(groupMemberDTO.ExpenseGroupID)) {
                return BadRequest("Expense group does not exist");
            }
            if (!await _userRepo.UserExists(groupMemberDTO.MemberID)) {
                return BadRequest("User does not exist");
            }

            var group = await _expenseGroupRepo.GetByIDAsync(groupMemberModel.ExpenseGroupID);

            var member = await _userRepo.GetByIDAsync(groupMemberModel.MemberID);

            // TODO: cleanup :(
            if (group != null && member != null) {
                await _groupMemberRepo.AddGroupMemberAsync(group, member);
            } else {
                return BadRequest("Bad request");
            }


            return Ok(groupMemberDTO);
        }

        [HttpGet]
        [Route("/group/{groupID}")]
        public async Task<IActionResult> GetAllMembersForExpenseGroup([FromRoute] int groupID) {
            var groupMembers = await _groupMemberRepo.GetAllForExpenseGroup(groupID);

            var groupMemberDTOs = groupMembers.Select(gm => gm.ToGroupMemberDTO());
            
            return Ok(groupMemberDTOs);
        }

        [HttpDelete]
        [Route("group/{groupID}/user/{userID}")]
        public async Task<IActionResult> Delete([FromRoute] int userID, int groupID) {
            var deleteMember = await _groupMemberRepo.DeleteAsync(userID, groupID);
            
            if (deleteMember == null) {
                return NotFound();
            }

            return NoContent();
        }

    }
}