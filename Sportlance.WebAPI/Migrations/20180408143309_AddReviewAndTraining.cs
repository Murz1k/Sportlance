using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.WebAPI.Migrations
{
    public partial class AddReviewAndTraining : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                "Trainings",
                table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy",
                            SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<long>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    TrainerId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trainings", x => x.Id);
                    table.ForeignKey(
                        "FK_Trainings_Users_ClientId",
                        x => x.ClientId,
                        "Users",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_Trainings_Trainers_TrainerId",
                        x => x.TrainerId,
                        "Trainers",
                        "Id",
                        onDelete: ReferentialAction.NoAction);
                });

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
                "TrainingId",
                unique: true);

            migrationBuilder.CreateIndex(
                "IX_Trainings_ClientId",
                "Trainings",
                "ClientId");

            migrationBuilder.CreateIndex(
                "IX_Trainings_TrainerId",
                "Trainings",
                "TrainerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "Reviews");

            migrationBuilder.DropTable(
                "Trainings");
        }
    }
}