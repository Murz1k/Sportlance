using System;
using System.ComponentModel.DataAnnotations;
using Sportlance.DAL.Core;

namespace Sportlance.DAL.Entities
{
    public class Review : IEntityWithId
    {
        public long Id { get; set; }

        public long TrainingId { get; set; }

        [MinLength(20), MaxLength(500), Required]
        public string Description { get; set; }
        
        public byte? Score { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        public Training Training { get; set; }
    }
}
