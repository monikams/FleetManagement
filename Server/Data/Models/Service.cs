namespace Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Service
    {
        [Key] public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required] public string Name { get; set; }

        public string Description { get; set; }
        
        // time => 0, mileage => 1
        [Required] public int BasedOn{ get; set; }

        // Time related properties
        public DateTimeOffset? Created { get; set; } = DateTimeOffset.Now;

        public int? TimeRule { get; set; }

        // 1 => Day; 2 => Months; 3 => Years
        public int? TimeRuleEntity { get; set; }

        public int? TimeReminder { get; set; }

        // 1 => Day; 2 => Months; 3 => Years
        public int? TimeReminderEntity { get; set; }

        public DateTimeOffset? NextServiceTime { get; set; }

        public DateTimeOffset? NextServiceReminderTime { get; set; }

        // Mileage related properties
        public int? MileageRule { get; set; }

        public int? MileageReminder { get; set; }

        public int? NextServiceMileage { get; set; }

        public int? NextServiceReminderMileage { get; set; }

        [Required] public string VehicleId { get; set; }

        public virtual Vehicle Vehicle { get; set; }        
    }
}