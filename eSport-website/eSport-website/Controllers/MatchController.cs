﻿using eSport_website.Db.Models;
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
        public async Task<List<ContractMatch>> GetAsync(int id)
        {
            /*List<Match> matches = db.Matches.AsNoTracking().Where(p => !p.IsFinished).Include(p => p.Tournament).ToList();
            
            if(matches.Count >= id)
                return Task.FromResult(matches.OrderBy(p => DateTime.Now - p.Date).Take(id));
            else
                return Task.FromResult(matches.OrderBy(p => DateTime.Now - p.Date).Take(matches.Count));*/
            List<Match> matches = await db.Matches.AsNoTracking().Where(p => DateTime.Compare(p.Date,DateTime.Now) > 0).Include(p => p.Tournament).ToListAsync();
            int count;
            if(matches.Count() >= id)
            {
                count = id;
            }
            else
            {
                count = matches.Count();
            }
            var matchesnew = matches.OrderBy(p =>  p.Date - DateTime.Now).Take(count);
            List<ContractMatch> contractMatches = new();
           foreach(var match in matchesnew)
            {
                ContractMatch contract = new();
                contract.Date = match.Date.Date;
                contract.NameTournament = (await db.Tournaments.AsNoTracking().FirstOrDefaultAsync(p => p.Id == match.TournamentId)).Name;
                contract.Enemy = match.Enemy;
                contractMatches.Add(contract);
            }
            return contractMatches;

        }
        [HttpPost]
        public async Task<IResult> PostAsync(Match match)
        {
            await db.Matches.AddAsync(match);
            await db.SaveChangesAsync();
            return Results.Ok();
        }

    }
}
