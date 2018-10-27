using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sportlance.WebAPI.Entities
{
    public class Role
    {
        public Role()
        {
            UserRoles = new List<UserRole>();
        }
        
        public long Id { get; set; }

        [Required] public string Name { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}