using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CurrencyConverter.API.Migrations
{
    /// <inheritdoc />
    public partial class AddDateColumnToCurrencyRatiosTable : Migration
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

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "CurrencyRatios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_CurrencyRatios_Currencies_BaseCurrencyId",
                table: "CurrencyRatios",
                column: "BaseCurrencyId",
                principalTable: "Currencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_CurrencyRatios_Currencies_TargetCurrencyId",
                table: "CurrencyRatios",
                column: "TargetCurrencyId",
                principalTable: "Currencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CurrencyRatios_Currencies_BaseCurrencyId",
                table: "CurrencyRatios");

            migrationBuilder.DropForeignKey(
                name: "FK_CurrencyRatios_Currencies_TargetCurrencyId",
                table: "CurrencyRatios");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "CurrencyRatios");

            migrationBuilder.AddForeignKey(
                name: "FK_CurrencyRatios_Currencies_BaseCurrencyId",
                table: "CurrencyRatios",
                column: "BaseCurrencyId",
                principalTable: "Currencies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CurrencyRatios_Currencies_TargetCurrencyId",
                table: "CurrencyRatios",
                column: "TargetCurrencyId",
                principalTable: "Currencies",
                principalColumn: "Id");
        }
    }
}
