using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.DTOs.GroupMember;

namespace api.Mappers
{
    public static class GroupMemberMapper
    {
        public static GroupMemberDTO ToGroupMemberDTO(this GroupMember groupMemberModel) {
            return new GroupMemberDTO {
                ExpenseGroupID = groupMemberModel.ExpenseGroupID,
                MemberID = groupMemberModel.MemberID
            };
        }

        public static GroupMember ToGroupMemberFromDTO(this GroupMemberDTO groupMemberModel) {
            return new GroupMember {
                ExpenseGroupID = groupMemberModel.ExpenseGroupID,
                MemberID = groupMemberModel.MemberID
            };
        }
    }
}