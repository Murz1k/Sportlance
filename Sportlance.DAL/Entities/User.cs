using System.ComponentModel.DataAnnotations;
using Sportlance.DAL.Core;

namespace Sportlance.DAL.Entities
{
    public class User: IEntityWithId
    {
        public long Id { get; set; }

        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public bool IsEmailConfirm { get; set; }

        public Trainer Trainer { get; set; }
    }
}
