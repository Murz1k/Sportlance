using System.ComponentModel.DataAnnotations;
using TrainersQuery = Sportlance.WebAPI.Entities.TrainersQuery;

namespace Sportlance.WebAPI.Requests
{
    public class GetTrainersQueryRequest
    {
        public GetTrainersQueryRequest()
        {
            Offset = 0;
            Count = 10;
        }

        public double? MinPrice { get; set; }

        public double? MaxPrice { get; set; }

        public string SearchString { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public ushort? TrainingsMinCount { get; set; }

        public ushort? TrainingsMaxCount { get; set; }

        public ushort? FeedbacksMinCount { get; set; }

        public ushort? FeedbacksMaxCount { get; set; }
        
        public long? TeamId { get; set; }

        public int Offset { get; set; }

        [Range(1, 100)] public int Count { get; set; }

        public TrainersQuery ToBLE()
        {
            return new TrainersQuery
            {
                Country = Country,
                City = City,
                Offset = Offset,
                Count = Count,
                TeamId = TeamId,
                MinPrice = MinPrice,
                MaxPrice = MaxPrice,
                SearchString = SearchString,
                TrainingsMinCount = TrainingsMinCount,
                TrainingsMaxCount = TrainingsMaxCount,
                FeedbacksMinCount = FeedbacksMinCount,
                FeedbacksMaxCount = FeedbacksMaxCount
            };
        }
    }
}