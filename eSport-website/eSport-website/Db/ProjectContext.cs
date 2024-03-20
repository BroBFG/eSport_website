using Microsoft.EntityFrameworkCore;
using eSport_website.Db.Models;

namespace eSport_website
{
    public class ProjectContext:DbContext
    {
        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Discipline> Disciplines { get; set; }

        public ProjectContext(DbContextOptions<ProjectContext> options):base(options)
        {;
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
        }

    }
}
