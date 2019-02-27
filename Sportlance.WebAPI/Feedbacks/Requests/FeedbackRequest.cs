namespace Sportlance.WebAPI.Feedbacks.Requests
{
    public class FeedbackRequest
    {
        public long UserId { get; set; }

        public string FirstName { get; set; }

        public string Email { get; set; }

        public string Comment { get; set; }
    }
}