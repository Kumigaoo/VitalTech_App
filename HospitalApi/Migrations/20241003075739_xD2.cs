using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalApi.Migrations
{
    /// <inheritdoc />
    public partial class xD2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pacients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DNI = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NumSS = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sexe = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pacients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Personals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DNI = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Especialitat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Plantes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Piso = table.Column<int>(type: "int", nullable: false),
                    CapacitatHabitacions = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plantes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EpisodisMedics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataObertura = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataTancament = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Dolencia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Estat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PacientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EpisodisMedics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EpisodisMedics_Pacients_PacientId",
                        column: x => x.PacientId,
                        principalTable: "Pacients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Habitacions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodiHabitacio = table.Column<int>(type: "int", nullable: false),
                    CapacitatLlits = table.Column<int>(type: "int", nullable: false),
                    PlantaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Habitacions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Habitacions_Plantes_PlantaId",
                        column: x => x.PlantaId,
                        principalTable: "Plantes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Consultes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Urgencia = table.Column<bool>(type: "bit", nullable: false),
                    Sintomatologia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recepta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonalId = table.Column<int>(type: "int", nullable: false),
                    EpisodiMedicId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consultes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Consultes_EpisodisMedics_EpisodiMedicId",
                        column: x => x.EpisodiMedicId,
                        principalTable: "EpisodisMedics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Consultes_Personals_PersonalId",
                        column: x => x.PersonalId,
                        principalTable: "Personals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Llits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodiLlit = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Ocupat = table.Column<bool>(type: "bit", nullable: false),
                    ForaDeServei = table.Column<bool>(type: "bit", nullable: false),
                    HabitacioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Llits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Llits_Habitacions_HabitacioId",
                        column: x => x.HabitacioId,
                        principalTable: "Habitacions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ingressos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataEntrada = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataSortida = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EpisodiMedicId = table.Column<int>(type: "int", nullable: false),
                    LlitId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingressos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ingressos_EpisodisMedics_EpisodiMedicId",
                        column: x => x.EpisodiMedicId,
                        principalTable: "EpisodisMedics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Ingressos_Llits_LlitId",
                        column: x => x.LlitId,
                        principalTable: "Llits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Consultes_EpisodiMedicId",
                table: "Consultes",
                column: "EpisodiMedicId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultes_PersonalId",
                table: "Consultes",
                column: "PersonalId");

            migrationBuilder.CreateIndex(
                name: "IX_EpisodisMedics_PacientId",
                table: "EpisodisMedics",
                column: "PacientId");

            migrationBuilder.CreateIndex(
                name: "IX_Habitacions_CodiHabitacio",
                table: "Habitacions",
                column: "CodiHabitacio",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Habitacions_PlantaId",
                table: "Habitacions",
                column: "PlantaId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingressos_EpisodiMedicId",
                table: "Ingressos",
                column: "EpisodiMedicId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingressos_LlitId",
                table: "Ingressos",
                column: "LlitId");

            migrationBuilder.CreateIndex(
                name: "IX_Llits_CodiLlit",
                table: "Llits",
                column: "CodiLlit",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Llits_HabitacioId",
                table: "Llits",
                column: "HabitacioId");

            migrationBuilder.CreateIndex(
                name: "IX_Pacients_DNI",
                table: "Pacients",
                column: "DNI",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pacients_NumSS",
                table: "Pacients",
                column: "NumSS",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Personals_DNI",
                table: "Personals",
                column: "DNI",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Consultes");

            migrationBuilder.DropTable(
                name: "Ingressos");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Personals");

            migrationBuilder.DropTable(
                name: "EpisodisMedics");

            migrationBuilder.DropTable(
                name: "Llits");

            migrationBuilder.DropTable(
                name: "Pacients");

            migrationBuilder.DropTable(
                name: "Habitacions");

            migrationBuilder.DropTable(
                name: "Plantes");
        }
    }
}
