﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class FleetManagementContext : DbContext
    {
        public FleetManagementContext()
            : base("name=FleetManagementContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Driver> Drivers { get; set; }
        public virtual DbSet<TelematicsData> TelematicsDatas { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserCompany> UserCompanies { get; set; }
        public virtual DbSet<Vehicle> Vehicles { get; set; }
    }
}
