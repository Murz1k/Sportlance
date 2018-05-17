using System.ComponentModel.DataAnnotations;

namespace Sportlance.DAL.Entities
{
    public class User
    {
        public long Id { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required, MaxLength(20)]
        public string FirstName { get; set; }

        [Required, MaxLength(30)]
        public string LastName { get; set; }

        public bool IsEmailConfirm { get; set; }

        public bool IsDeleted { get; set; }

        [Phone]
        public string Phone { get; set; }
    }
}
