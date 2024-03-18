using eSport_website.Db.Models;
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
            return db.Matches.ToListAsync();
        }

    }
}
