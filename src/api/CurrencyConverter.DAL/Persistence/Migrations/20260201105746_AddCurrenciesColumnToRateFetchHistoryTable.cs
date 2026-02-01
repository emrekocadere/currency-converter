using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CurrencyConverter.DAL.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCurrenciesColumnToRateFetchHistoryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Currencies",
                table: "CurrencyRateFetchHistories",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currencies",
                table: "CurrencyRateFetchHistories");
        }
    }
}
