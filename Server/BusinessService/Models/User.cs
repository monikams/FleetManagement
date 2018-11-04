namespace BusinessService.Models
{
    using Microsoft.AspNet.Identity.EntityFramework;

    public class User
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }
    }
}