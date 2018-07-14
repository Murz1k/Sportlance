namespace Sportlance.BLL.Entities
{
    public class TeamQuery
    {
        public TeamQuery()
        {
            Offset = 0;
            Count = 10;
        }

        public int Offset { get; set; }

        public int Count { get; set; }
    }
}