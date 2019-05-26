namespace WebApiService.Models
{
    using System;

    public class Vehicle
    {
        public string Id { get; set; }

        public string VIN { get; set; }

        public string PlateNumber { get; set; }

        public string Type { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public string ProductionYear { get; set; }

        public Company Company { get; set; }

        public string CompanyId { get; set; }

        public Driver Driver { get; set; }

        public string DriverId { get; set; }
    }

    public class EditVehicle
    {
        public string Id { get; set; }

        public string VIN { get; set; }

        public string PlateNumber { get; set; }

        public string Type { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public string ProductionYear { get; set; }

        public string CompanyId { get; set; }

        public string DriverId { get; set; }
    }
}