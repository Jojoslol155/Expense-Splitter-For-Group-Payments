using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Data;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace api.Repository
{
    public class GroupMemberRepository : IGroupMemberRepository
    {
        private readonly ApplicationDBContext _context;

        public GroupMemberRepository(ApplicationDBContext context)
        {
            _context = context;    
        }

        public async Task<GroupMember> AddGroupMemberAsync(ExpenseGroup group, User member) {
            GroupMember groupMember = new GroupMember {
                ExpenseGroup = group,
                Member = member
            };

            await _context.GroupMembers.AddAsync(groupMember);
            await _context.SaveChangesAsync();

            return groupMember;
        }
         public async Task<GroupMember?> DeleteAsync(int id)  {
            var member = await _context.GroupMembers.FirstOrDefaultAsync(gm => gm.MemberID == id);

            if (member == null) {
                return null;
            }

            _context.GroupMembers.Remove(member);
            await _context.SaveChangesAsync();
            return member;
        }

    }
}