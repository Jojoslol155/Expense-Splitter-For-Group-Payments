using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class updatejointable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupMembers_ExpenseGroups_ExpenseGroupId",
                table: "GroupMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupMembers_Users_UserID",
                table: "GroupMembers");

            migrationBuilder.RenameColumn(
                name: "ExpenseGroupId",
                table: "GroupMembers",
                newName: "MembersId");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "GroupMembers",
                newName: "ExpenseGroupsId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupMembers_ExpenseGroupId",
                table: "GroupMembers",
                newName: "IX_GroupMembers_MembersId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMembers_ExpenseGroups_ExpenseGroupsId",
                table: "GroupMembers",
                column: "ExpenseGroupsId",
                principalTable: "ExpenseGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMembers_Users_MembersId",
                table: "GroupMembers",
                column: "MembersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupMembers_ExpenseGroups_ExpenseGroupsId",
                table: "GroupMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupMembers_Users_MembersId",
                table: "GroupMembers");

            migrationBuilder.RenameColumn(
                name: "MembersId",
                table: "GroupMembers",
                newName: "ExpenseGroupId");

            migrationBuilder.RenameColumn(
                name: "ExpenseGroupsId",
                table: "GroupMembers",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_GroupMembers_MembersId",
                table: "GroupMembers",
                newName: "IX_GroupMembers_ExpenseGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMembers_ExpenseGroups_ExpenseGroupId",
                table: "GroupMembers",
                column: "ExpenseGroupId",
                principalTable: "ExpenseGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMembers_Users_UserID",
                table: "GroupMembers",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
