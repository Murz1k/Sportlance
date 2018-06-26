using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Sportlance.DAL.Entities
{
    public class User
    {
        public User()
        {
            UserRoles = new List<UserRole>();
        }

        public long Id { get; set; }

        [Required] [EmailAddress] public string Email { get; set; }

        [Required] public string PasswordHash { get; set; }

        [Required] [MaxLength(20)] public string FirstName { get; set; }

        [Required] [MaxLength(30)] public string LastName { get; set; }

        public bool IsEmailConfirm { get; set; }

        public bool IsDeleted { get; set; }

        [Phone] public string Phone { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }

        public IReadOnlyCollection<Role> Roles
        {
            get { return UserRoles.Select(i => i.Role).ToArray(); }
        }

        public void AddRole(Role role)
        {
            UserRoles.Add(new UserRole {Role = role, User = this});
        }

        public void RemoveRole(Role role)
        {
            var existRole = UserRoles.FirstOrDefault(i => i.Role.Name == role.Name);
            if (existRole != null)
            {
                UserRoles.Remove(existRole);
            }
        }
    }
}