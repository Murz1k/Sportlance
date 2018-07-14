using System.Collections.Generic;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Entities
{
    public class TrainerProfile
    {
        public long Id { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public double Price { get; set; }

        public double? Score { get; set; }

        public string About { get; set; }

        public string Title { get; set; }

        public TrainerStatus Status { get; set; }

        public IReadOnlyCollection<ReviewInfo> Reviews { get; set; }

        public IReadOnlyCollection<Sport> Sports { get; set; }

        public int TrainingsCount { get; set; }
        
        public string PhotoUrl { get; set; }
        
        public string BackgroundUrl { get; set; }
    }
}