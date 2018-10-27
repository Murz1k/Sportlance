using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.WebAPI.Migrations
{
    public partial class UpdateTrainerClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                "City",
                "Trainers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                "Country",
                "Trainers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                "FirstName",
                "Trainers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                "PhotoUrl",
                "Trainers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                "SecondName",
                "Trainers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "City",
                "Trainers");

            migrationBuilder.DropColumn(
                "Country",
                "Trainers");

            migrationBuilder.DropColumn(
                "FirstName",
                "Trainers");

            migrationBuilder.DropColumn(
                "PhotoUrl",
                "Trainers");

            migrationBuilder.DropColumn(
                "SecondName",
                "Trainers");
        }
    }
}