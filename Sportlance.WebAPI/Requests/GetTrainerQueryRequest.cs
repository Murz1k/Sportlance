using Sportlance.BLL.Entities;

namespace Sportlance.WebAPI.Requests
{
    public class GetTrainersQueryRequest
    {
        public double? MinPrice { get; set; }

        public double? MaxPrice { get; set; }

        public string SearchString { get; set; }

        public ushort? TrainingsMinCount { get; set; }

        public ushort? TrainingsMaxCount { get; set; }

        public ushort? FeedbacksMinCount { get; set; }

        public ushort? FeedbacksMaxCount { get; set; }

        public TrainersQuery ToBLE()
        {
            return new TrainersQuery
            {
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
