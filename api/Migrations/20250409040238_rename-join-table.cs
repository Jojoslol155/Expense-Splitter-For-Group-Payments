using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class renamejointable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExpenseGroupMembers_ExpenseGroups_ExpenseGroupsId",
                table: "ExpenseGroupMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_ExpenseGroupMembers_Users_MembersId",
                table: "ExpenseGroupMembers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExpenseGroupMembers",
                table: "ExpenseGroupMembers");

            migrationBuilder.RenameTable(
                name: "ExpenseGroupMembers",
                newName: "GroupMembers");

            migrationBuilder.RenameIndex(
                name: "IX_ExpenseGroupMembers_MembersId",
                table: "GroupMembers",
                newName: "IX_GroupMembers_MembersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupMembers",
                table: "GroupMembers",
                columns: new[] { "ExpenseGroupsId", "MembersId" });

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

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupMembers",
                table: "GroupMembers");

            migrationBuilder.RenameTable(
                name: "GroupMembers",
                newName: "ExpenseGroupMembers");

            migrationBuilder.RenameIndex(
                name: "IX_GroupMembers_MembersId",
                table: "ExpenseGroupMembers",
                newName: "IX_ExpenseGroupMembers_MembersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExpenseGroupMembers",
                table: "ExpenseGroupMembers",
                columns: new[] { "ExpenseGroupsId", "MembersId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ExpenseGroupMembers_ExpenseGroups_ExpenseGroupsId",
                table: "ExpenseGroupMembers",
                column: "ExpenseGroupsId",
                principalTable: "ExpenseGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExpenseGroupMembers_Users_MembersId",
                table: "ExpenseGroupMembers",
                column: "MembersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
