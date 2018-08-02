using System;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Entities
{
    public class TraningItem
    {
        public long Id { get; set; }

        public long ClientId { get; set; }
        
        public Sport Sport { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string ClientFirstName { get; set; }

        public string ClientLastName { get; set; }
    }
}