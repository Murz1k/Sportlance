using Sportlance.WebAPI.Trainers.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sportlance.WebAPI.Trainers.Requests
{
    public class UpdateWorkExperienceRequest
    {
        public IReadOnlyCollection<WorkExperienceResponse> WorkExperience { get; set; }
    }
}
