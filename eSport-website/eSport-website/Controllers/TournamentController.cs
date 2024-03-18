using eSport_website.Db.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eSport_website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        private readonly ProjectContext db;
        public TournamentController(ProjectContext context)
        {
            db = context;
        }

        [HttpGet]
        public Task<List<Tournament>> GetAsync()
        {
            return db.Tournaments.AsNoTracking().Include(p => p.Matches).ToListAsync();
        }
        [HttpPost]
        public void Post()
        {
            Discipline discipline = new Discipline() { Name = "CS", Icon_name = "cs.png" };
             Tournament a = new Tournament() { Name = "IEM Colone", Discipline = discipline };
             Match m1 = new Match() { Date = new DateTime(2023, 11, 01), Enemy = "TeamLiquid", Tournament = a };
             Match m2 = new Match() { Date = new DateTime(2023, 11, 02), Enemy = "NaVi", Tournament = a };
             Match m3 = new Match() { Date = new DateTime(2023, 11, 03), Enemy = "VP", Tournament = a };

             db.Disciplines.Add(discipline);
             db.Tournaments.Add(a);
             db.AddRange(m1, m2, m3);
             db.SaveChanges();

        }
    }
}
