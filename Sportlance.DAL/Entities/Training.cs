using System;
using Sportlance.DAL.Core;

namespace Sportlance.DAL.Entities
{
    public class Training : IEntityWithId
    {
        public long Id { get; set; }

        public long ClientId { get; set; }

        public long TrainerSportId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public Client Client { get; set; }

        public TrainerSports TrainerSport { get; set; }
    }
}
