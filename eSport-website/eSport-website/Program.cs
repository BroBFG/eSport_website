using Microsoft.EntityFrameworkCore;
using eSport_website;
using eSport_website.Db.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddDbContext<ProjectContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles( );

app.UseRouting();
app.UseMiddleware<ErrorMiddleware>();

app.MapGet("/login",
    async (context) => await context.Response.SendFileAsync("wwwroot/LoginPage.html"));
app.MapGet("/contacts",
    async (context) => await context.Response.SendFileAsync("wwwroot/contacts.html"));

app.UseEndpoints((endpoints) =>
{
    endpoints.MapControllers();
});

app.Run();
