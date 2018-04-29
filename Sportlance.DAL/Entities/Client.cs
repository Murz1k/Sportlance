namespace Sportlance.DAL.Entities
{
    public class Client
    {
        public long UserId { get; set; }

        public ClientStatus Status { get; set; }

        public User User { get; set; }
    }
}
