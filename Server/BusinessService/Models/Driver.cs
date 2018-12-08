namespace BusinessService.Models
{
    public class Driver
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public string CompanyId { get; set; }

        public Company Company { get; set; }
    }
}