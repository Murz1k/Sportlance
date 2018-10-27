using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.WebAPI.Migrations
{
    public partial class UpdateUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                "IsEmailConfirm",
                "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                "PasswordHash",
                "Users",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "IsEmailConfirm",
                "Users");

            migrationBuilder.DropColumn(
                "PasswordHash",
                "Users");
        }
    }
}