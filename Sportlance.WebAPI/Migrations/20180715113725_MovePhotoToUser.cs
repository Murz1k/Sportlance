using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.WebAPI.Migrations
{
    public partial class MovePhotoToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Trainers");

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Trainers",
                nullable: true);
        }
    }
}
