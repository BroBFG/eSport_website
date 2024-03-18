using eSport_website.Db.Models;
using eSport_website.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eSport_website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        ProjectContext db;
        public MatchController(ProjectContext context)
        {
            db = context;
        }

        [HttpGet]
        public Task<List<Match>> GetAsync()
        {
            return db.Matches.AsNoTracking().ToListAsync();
        }
        [HttpGet("{id}")]
        public Task<IEnumerable<Match>> GetAsync(int id)
        {
            List<Match> matches = db.Matches.AsNoTracking().Where(p => !p.IsFinished).Include(p => p.Tournament).ToList();
            
            if(matches.Count >= id)
                return Task.FromResult(matches.OrderBy(p => DateTime.Now - p.Date).Take(id));
            else
                return Task.FromResult(matches.OrderBy(p => DateTime.Now - p.Date).Take(matches.Count));
            /*foreach(MatchCompareable item in db.Matches.AsNoTracking().Where(p => p.IsFinished))
            {
                matches.Add(item);
            }
            matches.OrderBy(p => p.Date);*/
        }
        [HttpPost]
        public Task PostAsync(Match match)
        {
            db.Matches.Add(match);
            db.SaveChanges();
            return Task.FromResult(Task.CompletedTask);
        }

    }
}
