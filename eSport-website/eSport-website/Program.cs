using Microsoft.EntityFrameworkCore;
using eSport_website;
using eSport_website.Db.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.IdentityModel.Tokens;
using eSport_website.Models;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddDbContext<ProjectContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // указывает, будет ли валидироваться издатель при валидации токена
            ValidateIssuer = true,
            // строка, представляющая издателя
            ValidIssuer = AuthOptions.ISSUER,
            // будет ли валидироваться потребитель токена
            ValidateAudience = true,
            // установка потребителя токена
            ValidAudience = AuthOptions.AUDIENCE,
            // будет ли валидироваться время существования
            ValidateLifetime = true,
            // установка ключа безопасности
            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            // валидация ключа безопасности
            ValidateIssuerSigningKey = true,
        };
    });
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles( );



app.UseRouting();
app.UseMiddleware<ErrorMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/login",
    async (context) => await context.Response.SendFileAsync("wwwroot/LoginPage.html"));
app.MapPost("/login",
    async (User userData, ProjectContext db) => {
        User? user = await db.Users.FirstOrDefaultAsync(p => p.Nickname == userData.Nickname && p.Password == userData.Password);
        if (user == null)
            return Results.Unauthorized();

        var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Nickname) };
        // создаем JWT-токен
        var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(20)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        var response = new
        {
            access_token = encodedJwt,
            username = user.Nickname
        };

        return Results.Json(response);
    });
app.MapGet("/contacts",
    async (context) => await context.Response.SendFileAsync("wwwroot/contacts.html"));
app.MapGet("/adminpanel", 
    async (context) => await context.Response.SendFileAsync("wwwroot/AdminPanel.html"));

app.UseEndpoints((endpoints) =>
{
    endpoints.MapControllers();
});

app.Run();
