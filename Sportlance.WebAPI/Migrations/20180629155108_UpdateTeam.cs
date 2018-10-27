using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Sportlance.DAL.Migrations
{
    public partial class UpdateTeam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainerTeam_Teams_TeamId",
                table: "TrainerTeam");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainerTeam_Trainers_TrainerId",
                table: "TrainerTeam");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainerTeam",
                table: "TrainerTeam");

            migrationBuilder.RenameTable(
                name: "TrainerTeam",
                newName: "TrainerTeams");

            migrationBuilder.RenameIndex(
                name: "IX_TrainerTeam_TrainerId",
                table: "TrainerTeams",
                newName: "IX_TrainerTeams_TrainerId");

            migrationBuilder.RenameIndex(
                name: "IX_TrainerTeam_TeamId",
                table: "TrainerTeams",
                newName: "IX_TrainerTeams_TeamId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainerTeams",
                table: "TrainerTeams",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainerTeams_Teams_TeamId",
                table: "TrainerTeams",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainerTeams_Trainers_TrainerId",
                table: "TrainerTeams",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainerTeams_Teams_TeamId",
                table: "TrainerTeams");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainerTeams_Trainers_TrainerId",
                table: "TrainerTeams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainerTeams",
                table: "TrainerTeams");

            migrationBuilder.RenameTable(
                name: "TrainerTeams",
                newName: "TrainerTeam");

            migrationBuilder.RenameIndex(
                name: "IX_TrainerTeams_TrainerId",
                table: "TrainerTeam",
                newName: "IX_TrainerTeam_TrainerId");

            migrationBuilder.RenameIndex(
                name: "IX_TrainerTeams_TeamId",
                table: "TrainerTeam",
                newName: "IX_TrainerTeam_TeamId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainerTeam",
                table: "TrainerTeam",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainerTeam_Teams_TeamId",
                table: "TrainerTeam",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainerTeam_Trainers_TrainerId",
                table: "TrainerTeam",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
