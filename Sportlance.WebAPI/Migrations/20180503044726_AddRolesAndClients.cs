using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.WebAPI.Migrations
{
    public partial class AddRolesAndClients : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Trainings_Users_ClientId",
                "Trainings");

            migrationBuilder.DropForeignKey(
                "FK_Trainings_Trainers_TrainerId",
                "Trainings");

            migrationBuilder.DropPrimaryKey(
                "PK_TrainerSports",
                "TrainerSports");

            migrationBuilder.DropIndex(
                "IX_Reviews_TrainingId",
                "Reviews");

            migrationBuilder.RenameColumn(
                "TrainerId",
                "Trainings",
                "TrainerSportId");

            migrationBuilder.RenameIndex(
                "IX_Trainings_TrainerId",
                table: "Trainings",
                newName: "IX_Trainings_TrainerSportId");

            migrationBuilder.AddColumn<bool>(
                "IsDeleted",
                "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                "Phone",
                "Users",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                    "Id",
                    "TrainerSports",
                    nullable: false,
                    defaultValue: 0L)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                "Status",
                "Trainers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                "PK_TrainerSports",
                "TrainerSports",
                "Id");

            migrationBuilder.CreateTable(
                "Clients",
                table => new
                {
                    UserId = table.Column<long>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.UserId);
                    table.ForeignKey(
                        "FK_Clients_Users_UserId",
                        x => x.UserId,
                        "Users",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                "Roles",
                table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy",
                            SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table => { table.PrimaryKey("PK_Roles", x => x.Id); });

            migrationBuilder.CreateTable(
                "UserRoles",
                table => new
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
                        "FK_UserRoles_Roles_RoleId",
                        x => x.RoleId,
                        "Roles",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_UserRoles_Users_UserId",
                        x => x.UserId,
                        "Users",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                "IX_Users_Phone",
                "Users",
                "Phone",
                unique: true,
                filter: "[Phone] IS NOT NULL");

            migrationBuilder.CreateIndex(
                "IX_TrainerSports_SportId",
                "TrainerSports",
                "SportId");

            migrationBuilder.CreateIndex(
                "IX_Reviews_TrainingId",
                "Reviews",
                "TrainingId");

            migrationBuilder.CreateIndex(
                "IX_UserRoles_RoleId",
                "UserRoles",
                "RoleId");

            migrationBuilder.CreateIndex(
                "IX_UserRoles_UserId",
                "UserRoles",
                "UserId");

            migrationBuilder.AddForeignKey(
                "FK_Trainings_Clients_ClientId",
                "Trainings",
                "ClientId",
                "Clients",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                "FK_Trainings_TrainerSports_TrainerSportId",
                "Trainings",
                "TrainerSportId",
                "TrainerSports",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Trainings_Clients_ClientId",
                "Trainings");

            migrationBuilder.DropForeignKey(
                "FK_Trainings_TrainerSports_TrainerSportId",
                "Trainings");

            migrationBuilder.DropTable(
                "Clients");

            migrationBuilder.DropTable(
                "UserRoles");

            migrationBuilder.DropTable(
                "Roles");

            migrationBuilder.DropIndex(
                "IX_Users_Phone",
                "Users");

            migrationBuilder.DropPrimaryKey(
                "PK_TrainerSports",
                "TrainerSports");

            migrationBuilder.DropIndex(
                "IX_TrainerSports_SportId",
                "TrainerSports");

            migrationBuilder.DropIndex(
                "IX_Reviews_TrainingId",
                "Reviews");

            migrationBuilder.DropColumn(
                "IsDeleted",
                "Users");

            migrationBuilder.DropColumn(
                "Phone",
                "Users");

            migrationBuilder.DropColumn(
                "Id",
                "TrainerSports");

            migrationBuilder.DropColumn(
                "Status",
                "Trainers");

            migrationBuilder.RenameColumn(
                "TrainerSportId",
                "Trainings",
                "TrainerId");

            migrationBuilder.RenameIndex(
                "IX_Trainings_TrainerSportId",
                table: "Trainings",
                newName: "IX_Trainings_TrainerId");

            migrationBuilder.AddPrimaryKey(
                "PK_TrainerSports",
                "TrainerSports",
                new[] {"SportId", "TrainerId"});

            migrationBuilder.CreateIndex(
                "IX_Reviews_TrainingId",
                "Reviews",
                "TrainingId",
                unique: true);

            migrationBuilder.AddForeignKey(
                "FK_Trainings_Users_ClientId",
                "Trainings",
                "ClientId",
                "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                "FK_Trainings_Trainers_TrainerId",
                "Trainings",
                "TrainerId",
                "Trainers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}