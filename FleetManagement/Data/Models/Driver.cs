namespace Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Driver
    {
        public Driver()
        {
            this.Vehicles = new HashSet<Vehicle>();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Address { get; set; }

        [Required]
        public string Email { get; set; }

        public string Telephone { get; set; }

        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}