using eSport_website.Db.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace eSport_website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        private readonly ProjectContext db;
        ILogger logger;
        public TournamentController(ProjectContext context, ILogger<TournamentController> logger)
        {
            db = context;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<List<Tournament>> GetAsync()
        {
            logger.LogInformation("visited Get api/Tournament at {0}", DateTime.Now);
            return await db.Tournaments.AsNoTracking().ToListAsync();
        }

        [HttpGet("{id}")]
        public  IQueryable GetAsync(int id)
        {
            logger.LogInformation("visited Get id api/Tournament at {0}", DateTime.Now);
            if(id <= db.Tournaments.Count())
                return db.Tournaments.AsNoTracking().Where(p=> DateTime.Compare(p.EndDate, DateTime.Now) < 0).OrderByDescending(p => p.StartDate).Take(id);
            else
                return db.Tournaments.AsNoTracking().Where(p => DateTime.Compare(p.EndDate, DateTime.Now) < 0).OrderByDescending(p => p.StartDate).Take(db.Tournaments.Count());
        }

        [Authorize]
        [HttpPost]
        public async Task<IResult> PostAsync([FromBody]Tournament tournament)
        {
            logger.LogInformation("visited Post api/Tournament at {0}", DateTime.Now);
            try
            {
                await db.Tournaments.AddAsync(tournament);
                await db.SaveChangesAsync();
                logger.LogInformation("finished Post api/Tournament at {0} result: Ok", DateTime.Now);
                return Results.Ok();
            }
            catch
            {
                logger.LogInformation("finished Put api/Tournament at {0} result: Bad request", DateTime.Now);
                return Results.BadRequest();
            }
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IResult> PutAsync(int id, [FromBody] Tournament tournament)
        {
            logger.LogInformation("visited Put api/Tournament at {0}", DateTime.Now);
            var tournamentupdate = await db.Tournaments.FirstOrDefaultAsync(p => p.Id == id);
            if (tournamentupdate != null)
            {
                tournamentupdate.StartDate = tournament.StartDate;
                tournamentupdate.EndDate = tournament.EndDate;
                tournamentupdate.Prize = tournament.Prize;
                tournamentupdate.Place = tournament.Place;
                tournamentupdate.Name = tournament.Name;
                try
                {
                    await db.SaveChangesAsync();
                    logger.LogInformation("finished Put api/Tournament at {0} result: Ok", DateTime.Now);
                    return Results.Ok();
                }
                catch
                {
                    logger.LogInformation("finished Put api/Tournament at {0} result: Exception", DateTime.Now);
                    return Results.BadRequest();
                }
            }
            else
            {
                logger.LogInformation("finished Put api/Tournament at {0} result: Bad request", DateTime.Now);
                return Results.BadRequest();
            }

        }

    }
}
