using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.WebAPI.Migrations
{
    public partial class UpdateTrainer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_TrainerSports_Trainers_TrainerId",
                "TrainerSports");

            migrationBuilder.DropForeignKey(
                "FK_Trainings_Trainers_TrainerId",
                "Trainings");

            migrationBuilder.DropPrimaryKey(
                "PK_Trainers",
                "Trainers");

            migrationBuilder.DropIndex(
                "IX_Trainers_UserId",
                "Trainers");

            migrationBuilder.DropColumn(
                "Id",
                "Trainers");

            migrationBuilder.AddPrimaryKey(
                "PK_Trainers",
                "Trainers",
                "UserId");

            migrationBuilder.AddForeignKey(
                "FK_TrainerSports_Trainers_TrainerId",
                "TrainerSports",
                "TrainerId",
                "Trainers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                "FK_Trainings_Trainers_TrainerId",
                "Trainings",
                "TrainerId",
                "Trainers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_TrainerSports_Trainers_TrainerId",
                "TrainerSports");

            migrationBuilder.DropForeignKey(
                "FK_Trainings_Trainers_TrainerId",
                "Trainings");

            migrationBuilder.DropPrimaryKey(
                "PK_Trainers",
                "Trainers");

            migrationBuilder.AddColumn<long>(
                    "Id",
                    "Trainers",
                    nullable: false,
                    defaultValue: 0L)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                "PK_Trainers",
                "Trainers",
                "Id");

            migrationBuilder.CreateIndex(
                "IX_Trainers_UserId",
                "Trainers",
                "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                "FK_TrainerSports_Trainers_TrainerId",
                "TrainerSports",
                "TrainerId",
                "Trainers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                "FK_Trainings_Trainers_TrainerId",
                "Trainings",
                "TrainerId",
                "Trainers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}