using System;

namespace Sportlance.WebAPI.Entities
{
    public class Feedback
    {
        public long Id { get; set; }

        public DateTime CreateDate { get; set; }

        public long? UserId { get; set; }

        public string FirstName { get; set; }

        public string Email { get; set; }

        public string Comment { get; set; }

        public User User { get; set; }
    }
}
