using Sportlance.WebAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sportlance.WebAPI.Trainers.Responses
{
    public class WorkExperienceResponse
    {
        public long Id { get; set; }

        public string Position { get; set; }

        public string Company { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string Description { get; set; }

        public IEnumerable<SkillResponse> Skills { get; set; }

        public WorkExperienceResponse()
        {

        }

        public WorkExperienceResponse(TrainerWorkExperience entity)
        {
            Id = entity.Id;
            Position = entity.Position;
            Company = entity.Company;
            FromDate = entity.FromDate;
            ToDate = entity.ToDate;
            Description = entity.Description;
            Skills = entity.Skills.Select(i => new SkillResponse(i.Sport));
        }
    }
}
