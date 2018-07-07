using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Sportlance.DAL.Entities
{
    public class User
    {
        public User()
        {
            Roles = new List<Role>();
        }

        public long Id { get; set; }

        [Required] [EmailAddress] public string Email { get; set; }

        [Required] public string PasswordHash { get; set; }

        [Required] [MaxLength(20)] public string FirstName { get; set; }

        [Required] [MaxLength(30)] public string LastName { get; set; }

        public bool IsEmailConfirm { get; set; }

        public bool IsDeleted { get; set; }

        [Phone] public string Phone { get; set; }

        public ICollection<Role> Roles { get; set; }

        //public IEnumerable<Role> Roles
        //{
        //    get { return UserRoles.Select(i => i.Role); }
        //}

        public void AddRole(Role role)
        {
            Roles.Add(role);
        }

        public void RemoveRole(Role role)
        {
            var existRole = Roles.FirstOrDefault(i => i.Name == role.Name);
            if (existRole != null)
            {
                Roles.Remove(existRole);
            }
        }
    }
}