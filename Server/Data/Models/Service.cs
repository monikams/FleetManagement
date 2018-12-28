namespace Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Service
    {
        [Key] public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required] public string Name { get; set; }

        [Required] public string Description { get; set; }

        // Time related properties
        public DateTimeOffset? Created { get; set; }

        public int? TimeRule { get; set; }

        // 1 => Day; 2 => Months; 3 => Years
        public int? TimeRuleEntity { get; set; }

        public int? TimeReminder { get; set; }

        // 1 => Day; 2 => Months; 3 => Years
        public int? TimeReminderEntity { get; set; }

        public DateTimeOffset? NextServiceTime { get; set; }

        // Mileage related properties
        public int? MileageRule { get; set; }

        public int? MileageReminder { get; set; }

        public int? NextServiceMileage { get; set; }

        [Required] public string VehicleId { get; set; }

        public virtual Vehicle Vehicle { get; set; }
    }
}