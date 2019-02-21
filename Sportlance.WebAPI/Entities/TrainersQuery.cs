namespace Sportlance.WebAPI.Entities
{
    public class TrainersQuery
    {
        public TrainersQuery()
        {
            Offset = 0;
            Count = 10;
        }

        public double? MinPrice { get; set; }

        public double? MaxPrice { get; set; }

        public string Search { get; set; }

        public string Country { get; set; }

        public string City { get; set; }
        
        public long? TeamId { get; set; }

        public ushort? TrainingsMinCount { get; set; }

        public ushort? TrainingsMaxCount { get; set; }

        public ushort? FeedbacksMinCount { get; set; }

        public ushort? FeedbacksMaxCount { get; set; }

        public ushort? WorkExperienceFrom { get; set; }

        public ushort? WorkExperienceTo { get; set; }

        public int Offset { get; set; }

        public int Count { get; set; }
    }
}