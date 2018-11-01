namespace Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Vehicle
    {
        public Vehicle()
        {
            this.Services = new HashSet<Service>();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string VIN { get; set; }

        [Required]
        public string PlateNumber { get; set; }

        [Required]
        public int Type { get; set; }

        [Required]
        public string Brand { get; set; }

        public string Model { get; set; }

        [Required]
        public string CompanyId { get; set; }

        public virtual Company Company { get; set; }

        [Required]
        public string DriverId { get; set; }

        public virtual Driver Driver { get; set; }

        public virtual ICollection<Service> Services { get; set; }
    }
}