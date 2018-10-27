using System.Collections.Generic;

namespace Sportlance.WebAPI.Entities
{
    public class Trainer
    {
        public Trainer()
        {
            TrainerSports = new List<TrainerSport>();
            TrainerTeams = new List<TrainerTeam>();
        }

        public long UserId { get; set; }

        public string Title { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string About { get; set; }

        public double Price { get; set; }

        public string BackgroundUrl { get; set; }

        public User User { get; set; }

        public TrainerStatus Status { get; set; }

        public ICollection<TrainerSport> TrainerSports { get; set; }

        public ICollection<TrainerTeam> TrainerTeams { get; set; }
    }
}