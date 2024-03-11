using Microsoft.EntityFrameworkCore;

namespace eSport_website
{
    public class ProjectContext:DbContext
    {
        public ProjectContext(DbContextOptions<ProjectContext> options):base(options)
        {
            Database.EnsureCreated();
        }
    }
}
