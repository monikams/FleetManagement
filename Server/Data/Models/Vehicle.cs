namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Vehicle
    {
        public Vehicle()
        {
            this.Services = new HashSet<Service>();
        }

        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string VIN { get; set; }

        [Required]
        public string PlateNumber { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string Brand { get; set; }

        public string Model { get; set; }

        [Required]
        public string ProductionYear { get; set; }

        [Required]
        public string CompanyId { get; set; }

        public virtual Company Company { get; set; }

        public string DriverId { get; set; }

        public virtual Driver Driver { get; set; }

        public virtual ICollection<Service> Services { get; set; }
    }
}