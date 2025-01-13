using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CurrencyConverter.API.Migrations
{
    /// <inheritdoc />
    public partial class changeCurrencyRatioTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CurrencyRatios_Currencies_BaseCurrencyId",
                table: "CurrencyRatios");

            migrationBuilder.DropForeignKey(
                name: "FK_CurrencyRatios_Currencies_TargetCurrencyId",
                table: "CurrencyRatios");

            migrationBuilder.DropIndex(
                name: "IX_CurrencyRatios_BaseCurrencyId",
                table: "CurrencyRatios");

            migrationBuilder.DropIndex(
                name: "IX_CurrencyRatios_TargetCurrencyId",
                table: "CurrencyRatios");

            migrationBuilder.DropColumn(
                name: "BaseCurrencyId",
                table: "CurrencyRatios");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "CurrencyRatios");

            migrationBuilder.DropColumn(
                name: "Ratio",
                table: "CurrencyRatios");

            migrationBuilder.DropColumn(
                name: "TargetCurrencyId",
                table: "CurrencyRatios");

            migrationBuilder.AddColumn<string>(
                name: "Currencies",
                table: "CurrencyRatios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Rate",
                table: "CurrencyRatios",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currencies",
                table: "CurrencyRatios");

            migrationBuilder.DropColumn(
                name: "Rate",
                table: "CurrencyRatios");

            migrationBuilder.AddColumn<int>(
                name: "BaseCurrencyId",
                table: "CurrencyRatios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "CurrencyRatios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "Ratio",
                table: "CurrencyRatios",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "TargetCurrencyId",
                table: "CurrencyRatios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CurrencyRatios_BaseCurrencyId",
                table: "CurrencyRatios",
                column: "BaseCurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_CurrencyRatios_TargetCurrencyId",
                table: "CurrencyRatios",
                column: "TargetCurrencyId");

            migrationBuilder.AddForeignKey(
                name: "FK_CurrencyRatios_Currencies_BaseCurrencyId",
                table: "CurrencyRatios",
                column: "BaseCurrencyId",
                principalTable: "Currencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CurrencyRatios_Currencies_TargetCurrencyId",
                table: "CurrencyRatios",
                column: "TargetCurrencyId",
                principalTable: "Currencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
