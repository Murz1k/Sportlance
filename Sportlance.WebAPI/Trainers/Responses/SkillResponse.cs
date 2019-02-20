using Sportlance.WebAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sportlance.WebAPI.Trainers.Responses
{
    public class SkillResponse
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public Sport ToBLE()
        {
            return new Sport { Id = Id, Name = Name };
        }

        public SkillResponse()
        {

        }

        public SkillResponse(Sport sport)
        {
            Id = sport.Id;
            Name = sport.Name;
        }

        public SkillResponse(long id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
