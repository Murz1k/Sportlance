using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Sportlance.DAL.Core;

namespace Sportlance.DAL.Entities
{
    public class Trainer : IEntityWithId
    {
        public long Id { get; set; }

        public long UserId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string SecondName { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        public string About { get; set; }

        //TODO поменять на AzureBlobStorage
        public string PhotoUrl { get; set; }

        public User User { get; set; }

        public IReadOnlyCollection<TrainerSports> TrainerSports { get; set; }
    }
}
