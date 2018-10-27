namespace Sportlance.WebAPI.Entities
{
    public class TrainerTeam
    {
        public long Id { get; set; }

        public long TrainerId { get; set; }

        public long TeamId { get; set; }

        public Trainer Trainer { get; set; }

        public Team Team { get; set; }
    }
}