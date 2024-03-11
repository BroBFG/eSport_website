﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace eSport_website.Db.Models
{
    public class Match
    {
        [Key]
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string? Enemy { get; set; }

        [JsonIgnore]
        public int TournamentId { get; set; } //Внеш ключ на турнир
        [JsonIgnore]
        public Tournament? Tournament { get; set; } //Навигационное свойство 
    }
}
