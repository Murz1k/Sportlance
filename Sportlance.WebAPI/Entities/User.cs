using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Sportlance.WebAPI.Entities
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

        public string PhotoUrl { get; set; }

        public bool IsEmailConfirm { get; set; }

        public bool IsDeleted { get; set; }

        [Phone] public string Phone { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }

        //public IEnumerable<Role> Roles
        //{
        //    get { return UserRoles.Select(i => i.Role); }
        //}

        public void AddRole(Role role)
        {
            UserRoles.Add(new UserRole {Role = role});
        }

        public bool HasRoleRole(Role role)
        {
            return UserRoles.Any(i => i.Role == role);
        }

        public void RemoveRole(Role role)
        {
            var existUserRole = UserRoles.FirstOrDefault(i => i.Role.Name == role.Name);
            if (existUserRole != null)
            {
                UserRoles.Remove(existUserRole);
            }
        }
    }
}