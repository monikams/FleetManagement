namespace DataAccessService.Models
{
    using System.Collections.Generic;

    public class Company
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Bulstat { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public string CreatorId { get; set; }

        public User Creator { get; set; }

        public IEnumerable<string> Subscribers { get; set; }
    }
}