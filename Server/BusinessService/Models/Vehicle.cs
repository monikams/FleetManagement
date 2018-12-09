﻿namespace BusinessService.Models
{
    public class Vehicle
    {
        public string Id { get; set; }

        public string VIN { get; set; }

        public string PlateNumber { get; set; }

        public string Type { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public Company Company { get; set; }

        public string CompanyId { get; set; }

        public Driver Driver { get; set; }

        public string VehicleId { get; set; }
    }
}