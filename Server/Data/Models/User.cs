namespace Data.Models
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;

    public class User : IdentityUser
    {
        public User()
        {
            this.UserCompanies = new HashSet<UserCompany>();
            this.Companies = new HashSet<Company>();
        }

        public virtual ICollection<UserCompany> UserCompanies { get; set; }

        public virtual ICollection<Company> Companies { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(
            UserManager<User> manager,
            string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}