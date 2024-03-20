using eSport_website.Db.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eSport_website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        ProjectContext db;
        public UserController(ProjectContext context) 
        {
            db = context;
        }

        [HttpPost]
        public async Task<IResult> PostAsync(User user)
        {
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();
            return Results.Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<IResult> PutAsync(User user)
        {
            var person = await db.Users.FirstOrDefaultAsync();
            if (person != null)
            {
                person.Nickname = user.Nickname;
                person.Password = user.Password;
                await db.SaveChangesAsync();
                return Results.Ok();
            }
            else return Results.BadRequest();
        }
    }
}
