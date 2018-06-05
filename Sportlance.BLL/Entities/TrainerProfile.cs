using System.Collections.Generic;

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

        public IEnumerable<ReviewInfo> Reviews { get; set; }

        public int TrainingsCount { get; set; }

        //TODO поменять на AzureBlobStorage
        public string PhotoUrl { get; set; }
    }
}