using System.Collections.Generic;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Entities
{
    public class TrainerListItem
    {
        public long Id { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public double Price { get; set; }

        public double? Score { get; set; }

        public string Title { get; set; }

        public int FeedbacksCount { get; set; }

        public int TrainingsCount { get; set; }

        //TODO поменять на AzureBlobStorage
        public string PhotoUrl { get; set; }

        public IReadOnlyCollection<Sport> Sports { get; set; }
    }
}