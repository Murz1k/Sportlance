using System;

namespace Sportlance.WebAPI.Requests
{
    public class GetTrainingsRequest
    {
        public DateTimeOffset StartDate { get; set; }
        
        public DateTimeOffset EndDate { get; set; }
    }
}