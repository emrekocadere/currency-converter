using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CurrencyConverter.DAL.Migrations
{
    /// <inheritdoc />
    public partial class DeleteErrorLogsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ErrorLogs");

            migrationBuilder.DropColumn(
                name: "published_at",
                table: "News");

            migrationBuilder.RenameColumn(
                name: "url",
                table: "News",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "News",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "source",
                table: "News",
                newName: "Source");

            migrationBuilder.RenameColumn(
                name: "language",
                table: "News",
                newName: "Language");

            migrationBuilder.RenameColumn(
                name: "image",
                table: "News",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "News",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "country",
                table: "News",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "category",
                table: "News",
                newName: "Category");

            migrationBuilder.RenameColumn(
                name: "author",
                table: "News",
                newName: "Author");

            migrationBuilder.AddColumn<string>(
                name: "PublishedAt",
                table: "News",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublishedAt",
                table: "News");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "News",
                newName: "url");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "News",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Source",
                table: "News",
                newName: "source");

            migrationBuilder.RenameColumn(
                name: "Language",
                table: "News",
                newName: "language");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "News",
                newName: "image");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "News",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "News",
                newName: "country");

            migrationBuilder.RenameColumn(
                name: "Category",
                table: "News",
                newName: "category");

            migrationBuilder.RenameColumn(
                name: "Author",
                table: "News",
                newName: "author");

            migrationBuilder.AddColumn<string>(
                name: "published_at",
                table: "News",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "ErrorLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Error = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErrorLogs", x => x.Id);
                });
        }
    }
}
