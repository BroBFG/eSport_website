using eSport_website.Db.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;

namespace eSport_website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisciplineController : ControllerBase
    {
        ProjectContext db;
        public DisciplineController(ProjectContext context) 
        {
            db = context;
        }

        [HttpGet]
        public Task<List<Discipline>> GetAsync()
        {
            return db.Disciplines.AsNoTracking().ToListAsync();
        }
        [HttpPost]
        public Task PostAsync(Discipline discipline)
        {
            db.Add(discipline);
            db.SaveChanges();
            return Task.CompletedTask;
        }
    }
}
