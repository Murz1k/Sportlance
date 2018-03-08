using System.Collections.Generic;
using Sportlance.DAL.Core;

namespace Sportlance.DAL.Entities
{
    public class Trainer : IEntityWithId
    {
        public long Id { get; set; }

        public long UserId { get; set; }

        public User User { get; set; }

        public IReadOnlyCollection<TrainerSports> TrainerSports { get; set; }
    }
}
