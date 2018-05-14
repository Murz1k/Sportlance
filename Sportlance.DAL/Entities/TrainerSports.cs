namespace Sportlance.DAL.Entities
{
    public class TrainerSport
    {
        public long  Id { get; set; }

        public long TrainerId { get; set; }

        public long SportId { get; set; }

        public Trainer Trainer { get; set; }

        public Sport Sport { get; set; }
    }
}
