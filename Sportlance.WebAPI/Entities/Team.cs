using System;
using System.Collections.Generic;

namespace Sportlance.WebAPI.Entities
{
    public class Team
    {
        public Team()
        {
            TrainerTeams = new List<TrainerTeam>();
            TeamPhotos = new List<TeamPhoto>();
        }
        
        public long Id { get; set; }
        
        public long AuthorId { get; set; }

        public string Title { get; set; }

        public string SubTitle { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string About { get; set; }

        public string PhoneNumber { get; set; }

        public string PhotoUrl { get; set; }

        public string BackgroundUrl { get; set; }

        public TeamStatus Status { get; set; }

        public DateTime CreateDateTime { get; set; }

        public User Author { get; set; }

        public ICollection<TeamService> Services { get; set; }

        public ICollection<TeamPhoto> TeamPhotos { get; set; }

        public ICollection<TrainerTeam> TrainerTeams { get; set; }
    }
}