using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Sportlance.DAL.Migrations
{
    public partial class UpdateTrainerClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Trainers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Trainers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Trainers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Trainers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondName",
                table: "Trainers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "SecondName",
                table: "Trainers");
        }
    }
}
