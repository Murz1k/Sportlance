using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.DAL.Migrations
{
    public partial class UpdateUserNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                "FirstName",
                "Users",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                "LastName",
                "Users",
                maxLength: 30,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "FirstName",
                "Users");

            migrationBuilder.DropColumn(
                "LastName",
                "Users");
        }
    }
}