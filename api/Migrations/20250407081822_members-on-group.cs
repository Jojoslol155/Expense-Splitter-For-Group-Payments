using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class membersongroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
