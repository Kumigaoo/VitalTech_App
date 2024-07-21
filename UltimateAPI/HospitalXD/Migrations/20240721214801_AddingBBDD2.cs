using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalXD.Migrations
{
    /// <inheritdoc />
    public partial class AddingBBDD2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ForaDeServei",
                table: "Llits",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ForaDeServei",
                table: "Llits");
        }
    }
}
