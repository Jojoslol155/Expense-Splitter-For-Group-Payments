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
        Task<GroupMember> AddGroupMemberAsync(GroupMember groupMemberModel);
    }
}