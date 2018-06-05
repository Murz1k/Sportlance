using System.ComponentModel.DataAnnotations;

namespace Sportlance.DAL.Entities
{
    public class Role
    {
        public long Id { get; set; }

        [Required] public string Name { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}