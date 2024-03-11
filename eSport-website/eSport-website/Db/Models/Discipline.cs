namespace eSport_website.Db.Models
{
    public class Discipline
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Icon_name { get; set; }
        public List<Tournament>? Tournaments { get; set; }
    }
}
