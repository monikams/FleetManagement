namespace Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Vehicle
    {
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

        public string CompanyId { get; set; }

        public virtual Company Company { get; set; }

        [Required]
        public string DriverId { get; set; }

        public virtual Driver Driver { get; set; }
    }
}