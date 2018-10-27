using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.WebAPI.Migrations
{
    public partial class AddBackgroundImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BackgroundUrl",
                table: "Trainers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BackgroundUrl",
                table: "Teams",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackgroundUrl",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "BackgroundUrl",
                table: "Teams");
        }
    }
}
