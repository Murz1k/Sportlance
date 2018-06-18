using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.DAL.Migrations
{
    public partial class ReviewToFeedback : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "Reviews");

            migrationBuilder.DropColumn(
                "Price",
                "TrainerSports");

            migrationBuilder.DropColumn(
                "TaxType",
                "TrainerSports");

            migrationBuilder.DropColumn(
                "FirstName",
                "Trainers");

            migrationBuilder.DropColumn(
                "SecondName",
                "Trainers");

            migrationBuilder.AddColumn<double>(
                "Price",
                "Trainers",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<string>(
                "Name",
                "Roles",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateTable(
                "Feedbacks",
                table => new
                {
                    TrainingId = table.Column<long>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: false),
                    Score = table.Column<byte>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.TrainingId);
                    table.ForeignKey(
                        "FK_Feedbacks_Trainings_TrainingId",
                        x => x.TrainingId,
                        "Trainings",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "Feedbacks");

            migrationBuilder.DropColumn(
                "Price",
                "Trainers");

            migrationBuilder.AddColumn<double>(
                "Price",
                "TrainerSports",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                "TaxType",
                "TrainerSports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                "FirstName",
                "Trainers",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                "SecondName",
                "Trainers",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                "Name",
                "Roles",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateTable(
                "Reviews",
                table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy",
                            SqlServerValueGenerationStrategy.IdentityColumn),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: false),
                    Score = table.Column<byte>(nullable: true),
                    TrainingId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        "FK_Reviews_Trainings_TrainingId",
                        x => x.TrainingId,
                        "Trainings",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                "IX_Reviews_TrainingId",
                "Reviews",
                "TrainingId");
        }
    }
}