using System;
using System.ComponentModel.DataAnnotations;

namespace Sportlance.WebAPI.Entities
{
    public class Feedback
    {
        public long TrainingId { get; set; }

        [MinLength(20)]
        [MaxLength(500)]
        [Required]
        public string Description { get; set; }

        public byte? Score { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }
    }
}