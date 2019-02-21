using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sportlance.WebAPI.Entities
{
    public class TrainerWorkExperience
    {
        public long Id { get; set; }

        public long TrainerId { get; set; }

        public string Position { get; set; }

        public string Company { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string Description { get; set; }

        public ICollection<TrainerWorkExperienceSport> Skills { get; set; }

        public Trainer Trainer { get; set; }
    }
}
