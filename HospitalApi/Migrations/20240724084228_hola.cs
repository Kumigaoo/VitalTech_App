using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalApi.Migrations
{
    /// <inheritdoc />
    public partial class hola : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Consultes_Metges_MetgeId",
                table: "Consultes");

            migrationBuilder.DropTable(
                name: "Metges");

            migrationBuilder.RenameColumn(
                name: "MetgeId",
                table: "Consultes",
                newName: "PersonalId");

            migrationBuilder.RenameIndex(
                name: "IX_Consultes_MetgeId",
                table: "Consultes",
                newName: "IX_Consultes_PersonalId");

            migrationBuilder.CreateTable(
                name: "Personals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DNI = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Especialitat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personals", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Consultes_Personals_PersonalId",
                table: "Consultes",
                column: "PersonalId",
                principalTable: "Personals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Consultes_Personals_PersonalId",
                table: "Consultes");

            migrationBuilder.DropTable(
                name: "Personals");

            migrationBuilder.RenameColumn(
                name: "PersonalId",
                table: "Consultes",
                newName: "MetgeId");

            migrationBuilder.RenameIndex(
                name: "IX_Consultes_PersonalId",
                table: "Consultes",
                newName: "IX_Consultes_MetgeId");

            migrationBuilder.CreateTable(
                name: "Metges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DNI = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Especialitat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Metges", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Consultes_Metges_MetgeId",
                table: "Consultes",
                column: "MetgeId",
                principalTable: "Metges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
