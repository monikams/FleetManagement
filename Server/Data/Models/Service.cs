using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Service
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTimeOffset Created { get; set; }

        public int? MileageRule { get; set; }

        public DateTimeOffset? TimeRule { get; set; }

        public DateTimeOffset? NextServiceMileage { get; set; }

        public int? NextServiceTime { get; set; }

        public DateTimeOffset? TimeReminder { get; set; }

        public int? MileageReminder { get; set; }

        [Required]
        public string VehicleId { get; set; }

        public Vehicle Vehicle { get; set; }
    }
}
