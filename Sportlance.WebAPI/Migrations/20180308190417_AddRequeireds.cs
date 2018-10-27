using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.WebAPI.Migrations
{
    public partial class AddRequeireds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                "IX_Users_Email",
                "Users");

            migrationBuilder.AlterColumn<string>(
                "Email",
                "Users",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                "Name",
                "Sports",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                "IX_Users_Email",
                "Users",
                "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                "IX_TrainerSports_TrainerId",
                "TrainerSports",
                "TrainerId");

            migrationBuilder.CreateIndex(
                "IX_Trainers_UserId",
                "Trainers",
                "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                "FK_Trainers_Users_UserId",
                "Trainers",
                "UserId",
                "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                "FK_TrainerSports_Sports_SportId",
                "TrainerSports",
                "SportId",
                "Sports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                "FK_TrainerSports_Trainers_TrainerId",
                "TrainerSports",
                "TrainerId",
                "Trainers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Trainers_Users_UserId",
                "Trainers");

            migrationBuilder.DropForeignKey(
                "FK_TrainerSports_Sports_SportId",
                "TrainerSports");

            migrationBuilder.DropForeignKey(
                "FK_TrainerSports_Trainers_TrainerId",
                "TrainerSports");

            migrationBuilder.DropIndex(
                "IX_Users_Email",
                "Users");

            migrationBuilder.DropIndex(
                "IX_TrainerSports_TrainerId",
                "TrainerSports");

            migrationBuilder.DropIndex(
                "IX_Trainers_UserId",
                "Trainers");

            migrationBuilder.AlterColumn<string>(
                "Email",
                "Users",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                "Name",
                "Sports",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                "IX_Users_Email",
                "Users",
                "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");
        }
    }
}