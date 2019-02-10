using Microsoft.EntityFrameworkCore.Migrations;

namespace Sportlance.WebAPI.Migrations
{
    public partial class AddGeoToTeams : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Latitude",
                table: "Teams",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Longitude",
                table: "Teams",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<short>(
                name: "Zoom",
                table: "Teams",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.Sql(@"
                                    if not exists(select * from Roles where Name = ('Team'))
                                    insert Roles(Name) values ('Team')

                                    if not exists(select * from Roles where Name = ('Admin'))
                                    insert Roles(Name) values ('Admin')

                                    if not exists(select * from Roles where Name = ('Trainer'))
                                    insert Roles(Name) values ('Trainer')
                                "); 
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Zoom",
                table: "Teams");
        }
    }
}
