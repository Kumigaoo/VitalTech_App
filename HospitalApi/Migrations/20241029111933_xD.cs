using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalApi.Migrations
{
    /// <inheritdoc />
    public partial class xD : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Entitats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tablas = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entitats", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pacients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DNI = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NumSS = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cognom1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cognom2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sexe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nacionalidad = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthDay = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pacients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permisos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Accio = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permisos", x => x.Id);
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
                name: "Rol",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomRol = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descripcio = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rol", x => x.Id);
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
                name: "Administratiu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    DNI = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Correu = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administratiu", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Administratiu_Rol_Id",
                        column: x => x.Id,
                        principalTable: "Rol",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Enfermer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    DNI = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Especialitat = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enfermer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Enfermer_Rol_Id",
                        column: x => x.Id,
                        principalTable: "Rol",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Metge",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    DNI = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Especialitat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Metge", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Metge_Rol_Id",
                        column: x => x.Id,
                        principalTable: "Rol",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RolPermisEntitats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RolId = table.Column<int>(type: "int", nullable: false),
                    PermisId = table.Column<int>(type: "int", nullable: false),
                    EntitatId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolPermisEntitats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RolPermisEntitats_Entitats_EntitatId",
                        column: x => x.EntitatId,
                        principalTable: "Entitats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolPermisEntitats_Permisos_PermisId",
                        column: x => x.PermisId,
                        principalTable: "Permisos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolPermisEntitats_Rol_RolId",
                        column: x => x.RolId,
                        principalTable: "Rol",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SuperUsuari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuperUsuari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SuperUsuari_Rol_Id",
                        column: x => x.Id,
                        principalTable: "Rol",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Usuari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RolId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Usuari_Rol_RolId",
                        column: x => x.RolId,
                        principalTable: "Rol",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "EpisodisMedics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataObertura = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataTancament = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Motivo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Urgencia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Recepta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Estat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PacientId = table.Column<int>(type: "int", nullable: false),
                    UsuariId = table.Column<int>(type: "int", nullable: false)
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
                    table.ForeignKey(
                        name: "FK_EpisodisMedics_Usuari_UsuariId",
                        column: x => x.UsuariId,
                        principalTable: "Usuari",
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

            migrationBuilder.CreateTable(
                name: "PruebasDiagnosticas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Dolencia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UsuariId = table.Column<int>(type: "int", nullable: false),
                    EpisodiMedicId = table.Column<int>(type: "int", nullable: false),
                    MetgeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PruebasDiagnosticas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PruebasDiagnosticas_EpisodisMedics_EpisodiMedicId",
                        column: x => x.EpisodiMedicId,
                        principalTable: "EpisodisMedics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PruebasDiagnosticas_Metge_MetgeId",
                        column: x => x.MetgeId,
                        principalTable: "Metge",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PruebasDiagnosticas_Usuari_UsuariId",
                        column: x => x.UsuariId,
                        principalTable: "Usuari",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Administratiu_DNI",
                table: "Administratiu",
                column: "DNI",
                unique: true,
                filter: "[DNI] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Enfermer_DNI",
                table: "Enfermer",
                column: "DNI",
                unique: true,
                filter: "[DNI] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_EpisodisMedics_PacientId",
                table: "EpisodisMedics",
                column: "PacientId");

            migrationBuilder.CreateIndex(
                name: "IX_EpisodisMedics_UsuariId",
                table: "EpisodisMedics",
                column: "UsuariId");

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
                name: "IX_Metge_DNI",
                table: "Metge",
                column: "DNI",
                unique: true,
                filter: "[DNI] IS NOT NULL");

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
                name: "IX_Plantes_Piso",
                table: "Plantes",
                column: "Piso",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PruebasDiagnosticas_EpisodiMedicId",
                table: "PruebasDiagnosticas",
                column: "EpisodiMedicId");

            migrationBuilder.CreateIndex(
                name: "IX_PruebasDiagnosticas_MetgeId",
                table: "PruebasDiagnosticas",
                column: "MetgeId");

            migrationBuilder.CreateIndex(
                name: "IX_PruebasDiagnosticas_UsuariId",
                table: "PruebasDiagnosticas",
                column: "UsuariId");

            migrationBuilder.CreateIndex(
                name: "IX_RolPermisEntitats_EntitatId",
                table: "RolPermisEntitats",
                column: "EntitatId");

            migrationBuilder.CreateIndex(
                name: "IX_RolPermisEntitats_PermisId",
                table: "RolPermisEntitats",
                column: "PermisId");

            migrationBuilder.CreateIndex(
                name: "IX_RolPermisEntitats_RolId",
                table: "RolPermisEntitats",
                column: "RolId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuari_RolId",
                table: "Usuari",
                column: "RolId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administratiu");

            migrationBuilder.DropTable(
                name: "Enfermer");

            migrationBuilder.DropTable(
                name: "Ingressos");

            migrationBuilder.DropTable(
                name: "PruebasDiagnosticas");

            migrationBuilder.DropTable(
                name: "RolPermisEntitats");

            migrationBuilder.DropTable(
                name: "SuperUsuari");

            migrationBuilder.DropTable(
                name: "Llits");

            migrationBuilder.DropTable(
                name: "EpisodisMedics");

            migrationBuilder.DropTable(
                name: "Metge");

            migrationBuilder.DropTable(
                name: "Entitats");

            migrationBuilder.DropTable(
                name: "Permisos");

            migrationBuilder.DropTable(
                name: "Habitacions");

            migrationBuilder.DropTable(
                name: "Pacients");

            migrationBuilder.DropTable(
                name: "Usuari");

            migrationBuilder.DropTable(
                name: "Plantes");

            migrationBuilder.DropTable(
                name: "Rol");
        }
    }
}
