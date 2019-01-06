namespace WebApiService.Models
{
    using System;

    public class Service
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        // time => 0, mileage => 1
        public int BasedOn { get; set; }

        public DateTimeOffset? Created { get; set; }

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

        public string VehicleId { get; set; }

        public Vehicle Vehicle { get; set; }
    }

    public class EditService
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        // time => 0, mileage => 1
        public int BasedOn { get; set; }

        public int? TimeRule { get; set; }

        // 1 => Day; 2 => Months; 3 => Years
        public int? TimeRuleEntity { get; set; }

        public int? TimeReminder { get; set; }

        // 1 => Day; 2 => Months; 3 => Years
        public int? TimeReminderEntity { get; set; }

        // Mileage related properties
        public int? MileageRule { get; set; }

        public int? MileageReminder { get; set; }
    }

    public class PostService
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string VehicleId { get; set; }

        // time => 0, mileage => 1
        public int BasedOn { get; set; }

        public int? TimeRule { get; set; }

        // 1 => Day; 2 => Months; 3 => Years
        public int? TimeRuleEntity { get; set; }

        public int? TimeReminder { get; set; }

        // 1 => Day; 2 => Months; 3 => Years
        public int? TimeReminderEntity { get; set; }

        // Mileage related properties
        public int? MileageRule { get; set; }

        public int? MileageReminder { get; set; }
    }
}