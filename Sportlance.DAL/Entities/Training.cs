using System;
using Sportlance.DAL.Core;

namespace Sportlance.DAL.Entities
{
    public class Training : IEntityWithId
    {
        public long Id { get; set; }

        public long ClientId { get; set; }

        public long TrainerId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public User Client { get; set; }

        public Trainer Trainer { get; set; }

        public Review Review { get; set; }
    }
}
