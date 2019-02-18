namespace Sportlance.WebAPI.Entities
{
    public class TrainerResponse
    {
        public long Id { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public double Price { get; set; }

        public double? Score { get; set; }

        public string About { get; set; }

        public string Title { get; set; }

        public int TrainingsCount { get; set; }
        
        public string PhotoUrl { get; set; }
        
        public string BackgroundUrl { get; set; }

        public TrainerResponse()
        {

        }

        public TrainerResponse(Trainer trainer)
        {
            Id = trainer.UserId;
            FirstName = trainer.User.FirstName;
            SecondName = trainer.User.LastName;
            Country = trainer.Country;
            City = trainer.City;
            Price = trainer.Price;
            About = trainer.About;
            PhotoUrl = trainer.User.PhotoUrl;
            BackgroundUrl = trainer.BackgroundUrl;
        }
    }
}