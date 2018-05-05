using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Sportlance.DAL.Migrations
{
    public partial class AddRolesAndClients : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainings_Users_ClientId",
                table: "Trainings");

            migrationBuilder.DropForeignKey(
                name: "FK_Trainings_Trainers_TrainerId",
                table: "Trainings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainerSports",
                table: "TrainerSports");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_TrainingId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "TrainerId",
                table: "Trainings",
                newName: "TrainerSportId");

            migrationBuilder.RenameIndex(
                name: "IX_Trainings_TrainerId",
                table: "Trainings",
                newName: "IX_Trainings_TrainerSportId");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                    name: "Id",
                    table: "TrainerSports",
                    nullable: false,
                    defaultValue: 0L)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Trainers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainerSports",
                table: "TrainerSports",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    UserId = table.Column<long>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Clients_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy",
                            SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table => { table.PrimaryKey("PK_Roles", x => x.Id); });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy",
                            SqlServerValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<long>(nullable: false),
                    UserId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Phone",
                table: "Users",
                column: "Phone",
                unique: true,
                filter: "[Phone] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerSports_SportId",
                table: "TrainerSports",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_TrainingId",
                table: "Reviews",
                column: "TrainingId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserId",
                table: "UserRoles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainings_Clients_ClientId",
                table: "Trainings",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trainings_TrainerSports_TrainerSportId",
                table: "Trainings",
                column: "TrainerSportId",
                principalTable: "TrainerSports",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainings_Clients_ClientId",
                table: "Trainings");

            migrationBuilder.DropForeignKey(
                name: "FK_Trainings_TrainerSports_TrainerSportId",
                table: "Trainings");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Users_Phone",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainerSports",
                table: "TrainerSports");

            migrationBuilder.DropIndex(
                name: "IX_TrainerSports_SportId",
                table: "TrainerSports");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_TrainingId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "TrainerSports");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Trainers");

            migrationBuilder.RenameColumn(
                name: "TrainerSportId",
                table: "Trainings",
                newName: "TrainerId");

            migrationBuilder.RenameIndex(
                name: "IX_Trainings_TrainerSportId",
                table: "Trainings",
                newName: "IX_Trainings_TrainerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainerSports",
                table: "TrainerSports",
                columns: new[] {"SportId", "TrainerId"});

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_TrainingId",
                table: "Reviews",
                column: "TrainingId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Trainings_Users_ClientId",
                table: "Trainings",
                column: "ClientId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trainings_Trainers_TrainerId",
                table: "Trainings",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}