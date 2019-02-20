using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Sportlance.WebAPI.Migrations
{
    public partial class AddTrainerWorkExperience : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TrainerWorkExperience",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Company = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    FromDate = table.Column<DateTime>(nullable: false),
                    Position = table.Column<string>(nullable: false),
                    ToDate = table.Column<DateTime>(nullable: false),
                    TrainerId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainerWorkExperience", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainerWorkExperience_Trainers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainerWorkExperienceSport",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SportId = table.Column<long>(nullable: false),
                    TrainerWorkExperienceId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainerWorkExperienceSport", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainerWorkExperienceSport_Sports_SportId",
                        column: x => x.SportId,
                        principalTable: "Sports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainerWorkExperienceSport_TrainerWorkExperience_TrainerWorkExperienceId",
                        column: x => x.TrainerWorkExperienceId,
                        principalTable: "TrainerWorkExperience",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainerWorkExperience_TrainerId",
                table: "TrainerWorkExperience",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerWorkExperienceSport_SportId",
                table: "TrainerWorkExperienceSport",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerWorkExperienceSport_TrainerWorkExperienceId",
                table: "TrainerWorkExperienceSport",
                column: "TrainerWorkExperienceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainerWorkExperienceSport");

            migrationBuilder.DropTable(
                name: "TrainerWorkExperience");
        }
    }
}
