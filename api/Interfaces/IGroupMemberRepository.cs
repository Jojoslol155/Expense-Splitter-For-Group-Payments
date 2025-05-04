using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.DTOs.GroupMember;

namespace api.Interfaces
{
    public interface IGroupMemberRepository
    {
        Task<GroupMember> AddGroupMemberAsync(ExpenseGroup group, User member);
        Task<List<GroupMember>> GetAllForExpenseGroup(int expenseGroupID);
        Task<GroupMember> DeleteAsync(string userID, int expenseGroupID);
    }
}