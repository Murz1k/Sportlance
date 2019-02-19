using Sportlance.WebAPI.Trainers.Responses;
using System.Collections.Generic;

namespace Sportlance.WebAPI.Trainers.Requests
{
    public class UpdateSkillsRequest
    {
        public ICollection<SkillResponse> Skills { get; set; }
    }
}