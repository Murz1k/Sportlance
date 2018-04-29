namespace Sportlance.DAL.Entities
{
    public class TrainerSports
    {
        public long  Id { get; set; }

        public long TrainerId { get; set; }

        public long SportId { get; set; }

        public double Price { get; set; }

        public TaxType TaxType { get; set; }

        public Trainer Trainer { get; set; }

        public Sport Sport { get; set; }
    }
}
