using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalApi.Migrations
{
    /// <inheritdoc />
    public partial class lol2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Consultes_EpisodisMedics_EpisodiMedicId",
                table: "Consultes");

            migrationBuilder.DropForeignKey(
                name: "FK_Consultes_Metges_MetgeId",
                table: "Consultes");

            migrationBuilder.DropForeignKey(
                name: "FK_EpisodisMedics_Pacients_PacientId",
                table: "EpisodisMedics");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingressos_EpisodisMedics_EpisodiMedicId",
                table: "Ingressos");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingressos_Llits_LlitId",
                table: "Ingressos");

            migrationBuilder.DropIndex(
                name: "IX_Ingressos_EpisodiMedicId",
                table: "Ingressos");

            migrationBuilder.AddForeignKey(
                name: "FK_Consultes_EpisodisMedics_EpisodiMedicId",
                table: "Consultes",
                column: "EpisodiMedicId",
                principalTable: "EpisodisMedics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Consultes_Metges_MetgeId",
                table: "Consultes",
                column: "MetgeId",
                principalTable: "Metges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EpisodisMedics_Pacients_PacientId",
                table: "EpisodisMedics",
                column: "PacientId",
                principalTable: "Pacients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingressos_EpisodisMedics_LlitId",
                table: "Ingressos",
                column: "LlitId",
                principalTable: "EpisodisMedics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingressos_Llits_LlitId",
                table: "Ingressos",
                column: "LlitId",
                principalTable: "Llits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Consultes_EpisodisMedics_EpisodiMedicId",
                table: "Consultes");

            migrationBuilder.DropForeignKey(
                name: "FK_Consultes_Metges_MetgeId",
                table: "Consultes");

            migrationBuilder.DropForeignKey(
                name: "FK_EpisodisMedics_Pacients_PacientId",
                table: "EpisodisMedics");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingressos_EpisodisMedics_LlitId",
                table: "Ingressos");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingressos_Llits_LlitId",
                table: "Ingressos");

            migrationBuilder.CreateIndex(
                name: "IX_Ingressos_EpisodiMedicId",
                table: "Ingressos",
                column: "EpisodiMedicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Consultes_EpisodisMedics_EpisodiMedicId",
                table: "Consultes",
                column: "EpisodiMedicId",
                principalTable: "EpisodisMedics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Consultes_Metges_MetgeId",
                table: "Consultes",
                column: "MetgeId",
                principalTable: "Metges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EpisodisMedics_Pacients_PacientId",
                table: "EpisodisMedics",
                column: "PacientId",
                principalTable: "Pacients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingressos_EpisodisMedics_EpisodiMedicId",
                table: "Ingressos",
                column: "EpisodiMedicId",
                principalTable: "EpisodisMedics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingressos_Llits_LlitId",
                table: "Ingressos",
                column: "LlitId",
                principalTable: "Llits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
