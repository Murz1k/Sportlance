using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sportlance.WebAPI.Entities
{
    public class Sport
    {
        public Sport()
        {
            Skills = new List<TrainerWorkExperienceSport>();
        }

        public long Id { get; set; }

        [Required] public string Name { get; set; }

        public ICollection<TrainerWorkExperienceSport> Skills { get; set; }
    }
}