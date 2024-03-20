using System.ComponentModel.DataAnnotations;

namespace eSport_website.Db.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Nickname { get; set; }
        public string Password { get; set; }
    }
}
