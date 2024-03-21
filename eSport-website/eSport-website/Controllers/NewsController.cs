using eSport_website.Db.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eSport_website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        ProjectContext db;
        public NewsController(ProjectContext context) 
        {
            db = context;
        }

        [HttpGet]
        public async Task<List<News>> GetAsync()
        {
            return await db.News.ToListAsync();
        }
        [HttpGet("{id}")]
        public  IQueryable GetAsync(int id)
        {
            if (id > db.Tournaments.Count())
                id = db.Tournaments.Count();
            return db.News.OrderByDescending(p=>p.Date).Take(id);
        }
        [Authorize]
        [HttpPost]
        public async Task<IResult> PostAsync(News newnews)
        {
            await db.News.AddAsync(newnews);
            await db.SaveChangesAsync();
            return Results.Ok();
        }
    }
}
