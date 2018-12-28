﻿namespace WebApiService.Models
{
    using System;

    public class Service
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

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

        public string VehicleId { get; set; }

        public Vehicle Vehicle { get; set; }
    }
}