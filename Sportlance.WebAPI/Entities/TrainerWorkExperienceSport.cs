using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sportlance.WebAPI.Entities
{
    public class TrainerWorkExperienceSport
    {
        public long Id { get; set; }

        public long TrainerWorkExperienceId { get; set; }

        public long SportId { get; set; }

        public TrainerWorkExperience TrainerWorkExperience { get; set; }

        public Sport Sport { get; set; }
    }
}
