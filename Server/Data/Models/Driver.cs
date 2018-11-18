namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Driver
    {
        public Driver()
        {
            this.Vehicles = new HashSet<Vehicle>();
        }

        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string Name { get; set; }

        public string Address { get; set; }

        [Required]
        public string Email { get; set; }

        public string Telephone { get; set; }

        [Required]
        public string CompanyId { get; set; }

        public virtual Company Company { get; set; }

        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}