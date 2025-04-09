using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Data;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;
using api.DTOs.GroupMember;
using System.Text.RegularExpressions;


namespace api.Repository
{
    public class GroupMemberRepository : IGroupMemberRepository
    {
        private readonly ApplicationDBContext _context;

        public GroupMemberRepository(ApplicationDBContext context)
        {
            _context = context;    
        }

        public async Task<GroupMember> AddGroupMemberAsync(GroupMember groupMemberModel) {
            ExpenseGroup group = await _context.ExpenseGroups
                .Include(eg => eg.Expenses)
                .Include(eg => eg.GroupMembers).ThenInclude(gm => gm.Member)
                .FirstOrDefaultAsync(eg => eg.Id == groupMemberModel.ExpenseGroupID);

            User member = await _context.Users.FirstOrDefaultAsync(u => u.Id == groupMemberModel.MemberID);

            GroupMember groupMember = new GroupMember {
                ExpenseGroup = group,
                Member = member
            };

            await _context.GroupMembers.AddAsync(groupMember);
            await _context.SaveChangesAsync();

            return groupMember;
        }

    }
}