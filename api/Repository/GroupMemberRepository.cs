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

        public async Task<List<GroupMember>> GetAllForExpenseGroup(int expenseGroupID)
        {
            return await _context.GroupMembers
                .Where(gm => gm.ExpenseGroupID == expenseGroupID)
                .ToListAsync();
        }

         public async Task<GroupMember?> DeleteAsync(string userID, int expenseGroupID)  {
            var member = await _context.GroupMembers.FirstOrDefaultAsync(gm => gm.MemberID == userID && gm.ExpenseGroupID == expenseGroupID);

            if (member == null) {
                return null;
            }

            _context.GroupMembers.Remove(member);
            await _context.SaveChangesAsync();
            return member;
        }
    }
}