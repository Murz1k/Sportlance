using System;

namespace Sportlance.WebAPI.Requests
{
    public class AddTrainingRequest
    {
        public long SportId { get; set; }
        
        public DateTimeOffset StartDate { get; set; }
    }
}