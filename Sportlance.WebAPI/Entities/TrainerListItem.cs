using System.Collections.Generic;
using AzureFile = Sportlance.WebAPI.Core.AzureFile;

namespace Sportlance.WebAPI.Entities
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

        public string About { get; set; }

        public int FeedbacksCount { get; set; }

        public int TrainingsCount { get; set; }

        public AzureFile Photo { get; set; }

        public IReadOnlyCollection<Sport> Sports { get; set; }
    }
}