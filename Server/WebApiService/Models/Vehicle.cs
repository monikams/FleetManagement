﻿namespace WebApiService.Models
{
    using System;

    public class Vehicle
    {
        public string Id { get; set; }

        public string VIN { get; set; }

        public string PlateNumber { get; set; }

        public int Type { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public Company Company { get; set; }

        public Driver Driver { get; set; }
    }
}