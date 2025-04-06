using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class newcolumnsexpense : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_ExpenseGroups_ExpenseGroupId",
                table: "Expenses");

            migrationBuilder.RenameColumn(
                name: "ExpenseGroupId",
                table: "Expenses",
                newName: "ExpenseGroupID");

            migrationBuilder.RenameIndex(
                name: "IX_Expenses_ExpenseGroupId",
                table: "Expenses",
                newName: "IX_Expenses_ExpenseGroupID");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Expenses",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_ExpenseGroups_ExpenseGroupID",
                table: "Expenses",
                column: "ExpenseGroupID",
                principalTable: "ExpenseGroups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_ExpenseGroups_ExpenseGroupID",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Expenses");

            migrationBuilder.RenameColumn(
                name: "ExpenseGroupID",
                table: "Expenses",
                newName: "ExpenseGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_Expenses_ExpenseGroupID",
                table: "Expenses",
                newName: "IX_Expenses_ExpenseGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_ExpenseGroups_ExpenseGroupId",
                table: "Expenses",
                column: "ExpenseGroupId",
                principalTable: "ExpenseGroups",
                principalColumn: "Id");
        }
    }
}
