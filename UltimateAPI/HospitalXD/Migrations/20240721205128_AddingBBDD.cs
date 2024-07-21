using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalXD.Migrations
{
    /// <inheritdoc />
    public partial class AddingBBDD : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateTable(
                name: "Pacients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumSS = table.Column<int>(type: "int", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Estat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sexe = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pacients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Plantes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumHabs = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plantes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EpisodisMedics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Habitacions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Num_llits = table.Column<int>(type: "int", nullable: false),
                    Capacitat = table.Column<int>(type: "int", nullable: false),
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
                    Dolencia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recepta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PacientId = table.Column<int>(type: "int", nullable: false),
                    MetgeId = table.Column<int>(type: "int", nullable: false),
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
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Consultes_Metges_MetgeId",
                        column: x => x.MetgeId,
                        principalTable: "Metges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Consultes_Pacients_PacientId",
                        column: x => x.PacientId,
                        principalTable: "Pacients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Llits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocupat = table.Column<bool>(type: "bit", nullable: false),
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
                    DataSortida = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ingressos_Llits_LlitId",
                        column: x => x.LlitId,
                        principalTable: "Llits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Consultes_EpisodiMedicId",
                table: "Consultes",
                column: "EpisodiMedicId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultes_MetgeId",
                table: "Consultes",
                column: "MetgeId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultes_PacientId",
                table: "Consultes",
                column: "PacientId");

            migrationBuilder.CreateIndex(
                name: "IX_EpisodisMedics_PacientId",
                table: "EpisodisMedics",
                column: "PacientId");

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
                name: "IX_Llits_HabitacioId",
                table: "Llits",
                column: "HabitacioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Consultes");

            migrationBuilder.DropTable(
                name: "Ingressos");

            migrationBuilder.DropTable(
                name: "Metges");

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
