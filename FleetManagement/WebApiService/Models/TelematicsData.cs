using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiService.Models
{
    public class TelematicsData
    {
        public string Id { get; set; }
        public string VIN { get; set; }
        public int? CurrentSpeed { get; set; }
        public int? FuelLevel { get; set; }
        public int? FuelUsed { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public int? RPM { get; set; }
        public int? EngineSpeed { get; set; }
        public int? EngineHours { get; set; }
        public int? Mileage { get; set; }
        public bool? IsDoorOpen { get; set; }
        public TimeSpan? Idling { get; set; }
        public bool? Ignition { get; set; }
        public bool? SeatBelt { get; set; }
        public bool? HarshAccelaration { get; set; }
        public bool? HarshBraking { get; set; }
        public bool? HarshCornering { get; set; }
        public bool? TailGating { get; set; }
    }
}