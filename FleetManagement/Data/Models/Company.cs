namespace Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Company
    {
        public Company()
        {
            this.UserCompanies = new HashSet<UserCompany>();
            this.Vehicles = new HashSet<Vehicle>();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Bulstat { get; set; }

        [Required]
        public string Email { get; set; }

        public string Telephone { get; set; }

        public virtual ICollection<UserCompany> UserCompanies { get; set; }

        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}