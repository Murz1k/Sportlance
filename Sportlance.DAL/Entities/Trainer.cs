using System.Collections.Generic;

namespace Sportlance.DAL.Entities
{
    public class Trainer
    {
        public Trainer()
        {
            TrainerSports = new List<TrainerSport>();
        }
        
        public long UserId { get; set; }

        public string Title { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string About { get; set; }

        //TODO поменять на AzureBlobStorage
        public string PhotoUrl { get; set; }

        public double Price { get; set; }

        public User User { get; set; }

        public TrainerStatus Status { get; set; }

        public ICollection<TrainerSport> TrainerSports { get; set; }
    }
}