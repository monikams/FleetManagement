//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EntityModel
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    using Microsoft.AspNet.Identity;

    using System.ComponentModel.DataAnnotations.Schema;

    public partial class User : IUser
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            this.UserCompany = new HashSet<UserCompany>();
        }
    
        public System.Guid Id { get; set; }

        public string UserName { get; set; }
    
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserCompany> UserCompany { get; set; }

        [NotMapped]
        string IUser<string>.Id => this.Id.ToString();
    }
}
