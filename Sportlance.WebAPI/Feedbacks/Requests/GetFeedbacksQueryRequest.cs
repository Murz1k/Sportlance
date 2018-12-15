using System.ComponentModel.DataAnnotations;

namespace Sportlance.WebAPI.Feedbacks.Requests
{
    public class GetFeedbacksQueryRequest
    {
        public GetFeedbacksQueryRequest()
        {
            Offset = 0;
            Count = 10;
        }

        public int Offset { get; set; }

        [Range(1, 100)] public int Count { get; set; }
    }
}