using System.ComponentModel.DataAnnotations;

namespace Sportlance.WebAPI.Entities
{
    public class Sport
    {
        public long Id { get; set; }

        [Required] public string Name { get; set; }
    }
}