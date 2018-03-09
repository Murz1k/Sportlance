using System.Collections.Generic;
using Sportlance.DAL.Core;

namespace Sportlance.DAL.Entities
{
    public class Trainer : IEntityWithId
    {
        public long Id { get; set; }

        public long UserId { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        //TODO поменять на AzureBlobStorage
        public string PhotoUrl { get; set; }

        public User User { get; set; }

        public IReadOnlyCollection<TrainerSports> TrainerSports { get; set; }
    }
}
