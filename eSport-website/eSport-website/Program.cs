using Microsoft.EntityFrameworkCore;
using eSport_website;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ProjectContext>(options => options.UseSqlServer("DefaultConnection"));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles( );

app.UseRouting();
app.UseMiddleware<ErrorMiddleware>();

app.MapGet("/login",
    async (context) => await context.Response.SendFileAsync("wwwroot/LoginPage.html"));
app.MapGet("/contacts",
    async (context) => await context.Response.SendFileAsync("wwwroot/contacts.html"));

/*app.MapControllerRoute(
    name: "deafult",
    pattern: "{controller=Home}/{action=Index}/{id?}");*/


app.Run();
