using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Sportlance.WebAPI.Migrations
{
    public partial class RenameFeedbacksToTrainerFeedback : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.CreateTable(
                name: "TrainerFeedback",
                columns: table => new
                {
                    TrainingId = table.Column<long>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: false),
                    Score = table.Column<byte>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainerFeedback", x => x.TrainingId);
                    table.ForeignKey(
                        name: "FK_TrainerFeedback_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainerFeedback");

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
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
                        name: "FK_Feedbacks_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }
    }
}
