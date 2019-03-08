using System.ComponentModel.DataAnnotations;

namespace Sportlance.WebAPI.Feedbacks.Requests
{
    public class FeedbackRequest
    {
        public long? UserId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}