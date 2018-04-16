using System;

namespace Sportlance.BLL.Entities
{
    public class ReviewInfo
    {
        public string PhotoUrl { get; set; }

        public string ClientName { get; set; }

        public byte? Score { get; set; }

        public string Description { get; set; }

        public DateTime CreateDate { get; set; }
    }
}
