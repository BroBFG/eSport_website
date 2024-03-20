using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace eSport_website.Db.Models
{
    public class Tournament
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Prize { get; set; }
        public int? Place { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<Match>? Matches { get; set; } // Матчи турнира

        
        public int DisciplineId { get; set; } //Внеш ключ на дисциплину
        [JsonIgnore]
        public Discipline? Discipline { get; set; } // Навигационное свойство
    }
}
