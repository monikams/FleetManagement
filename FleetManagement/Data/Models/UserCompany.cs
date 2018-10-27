namespace Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class UserCompany
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CompanyId { get; set; }

        public virtual Company Company { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}