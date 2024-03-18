using eSport_website.Db.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace eSport_website.Models
{
    public class MatchCompareable : Match, IComparable
    {
        public int CompareTo(object? obj)
        {
            return Date.CompareTo((obj as MatchCompareable).Date);
        }
    }
}
