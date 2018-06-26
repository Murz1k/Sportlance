using System;
using System.Collections.Generic;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Entities
{
    public class TeamProfile
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string SubTitle { get; set; }
        
        public string PhotoUrl { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public double? Score { get; set; }

        public string About { get; set; }

        public TeamStatus Status { get; set; }

        public DateTime CreateDateTime { get; set; }

        public IReadOnlyCollection<ReviewInfo> Reviews { get; set; }
    }
}