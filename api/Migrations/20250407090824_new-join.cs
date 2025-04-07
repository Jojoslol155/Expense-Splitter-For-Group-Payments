using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class newjoin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_ExpenseGroups_ExpenseGroupId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_ExpenseGroupId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ExpenseGroupId",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "GroupMembers",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false),
                    ExpenseGroupId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupMembers", x => new { x.UserID, x.ExpenseGroupId });
                    table.ForeignKey(
                        name: "FK_GroupMembers_ExpenseGroups_ExpenseGroupId",
                        column: x => x.ExpenseGroupId,
                        principalTable: "ExpenseGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupMembers_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupMembers_ExpenseGroupId",
                table: "GroupMembers",
                column: "ExpenseGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupMembers");

            migrationBuilder.AddColumn<int>(
                name: "ExpenseGroupId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_ExpenseGroupId",
                table: "Users",
                column: "ExpenseGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_ExpenseGroups_ExpenseGroupId",
                table: "Users",
                column: "ExpenseGroupId",
                principalTable: "ExpenseGroups",
                principalColumn: "Id");
        }
    }
}
