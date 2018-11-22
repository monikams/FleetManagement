namespace Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Service
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

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

        public virtual Vehicle Vehicle { get; set; }
    }
}