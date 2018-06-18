using System.Collections.Generic;

namespace Sportlance.DAL.Entities
{
    public class TrainerSport
    {
        public TrainerSport()
        {
            Trainings = new List<Training>();
        }

        public long Id { get; set; }

        public long TrainerId { get; set; }

        public long SportId { get; set; }

        public Sport Sport { get; set; }

        public ICollection<Training> Trainings { get; set; }
    }
}