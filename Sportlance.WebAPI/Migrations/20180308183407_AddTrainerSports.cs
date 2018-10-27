using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.DAL.Migrations
{
    public partial class AddTrainerSports : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                "Email",
                "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                "Trainers",
                table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy",
                            SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<long>(nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_Trainers", x => x.Id); });

            migrationBuilder.CreateTable(
                "TrainerSports",
                table => new
                {
                    SportId = table.Column<long>(nullable: false),
                    TrainerId = table.Column<long>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    TaxType = table.Column<int>(nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_TrainerSports", x => new {x.SportId, x.TrainerId}); });

            migrationBuilder.CreateIndex(
                "IX_Users_Email",
                "Users",
                "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "Trainers");

            migrationBuilder.DropTable(
                "TrainerSports");

            migrationBuilder.DropIndex(
                "IX_Users_Email",
                "Users");

            migrationBuilder.DropColumn(
                "Email",
                "Users");
        }
    }
}