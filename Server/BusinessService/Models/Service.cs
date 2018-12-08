namespace BusinessService.Models
{
    using System;

    public class Service
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset Created { get; set; }

        public int? MileageRule { get; set; }

        public DateTimeOffset? TimeRule { get; set; }

        public DateTimeOffset? NextServiceMileage { get; set; }

        public int? NextServiceTime { get; set; }

        public DateTimeOffset? TimeReminder { get; set; }

        public int? MileageReminder { get; set; }

        public string VehicleId { get; set; }

        public Vehicle Vehicle { get; set; }
    }
}