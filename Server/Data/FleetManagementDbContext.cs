namespace Data
{
    using System.Data.Entity;

    using Data.Models;

    using Microsoft.AspNet.Identity.EntityFramework;

    public class FleetManagementDbContext : IdentityDbContext<User>
    {
        public FleetManagementDbContext()
            : base("FleetManagementConnection", throwIfV1Schema: false)
        {
        }

        public virtual DbSet<Company> Companies { get; set; }

        public virtual DbSet<Driver> Drivers { get; set; }

        public virtual DbSet<TelematicsData> TelematicsDatas { get; set; }

        public virtual DbSet<UserCompany> UserCompanies { get; set; }

        public virtual DbSet<Vehicle> Vehicles { get; set; }

        public virtual DbSet<Service> Services { get; set; }

        public static FleetManagementDbContext Create()
        {
            return new FleetManagementDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Vehicle>().HasRequired(v => v.Company).WithMany(c => c.Vehicles)
                        .HasForeignKey(v => v.CompanyId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Vehicle>().HasRequired(v => v.Driver).WithMany(d => d.Vehicles)
                        .HasForeignKey(v => v.DriverId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Company>().HasRequired(c => c.Creator).WithMany(u => u.Companies)
                        .HasForeignKey(c => c.CreatorId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Service>().HasRequired(v => v.Vehicle).WithMany(d => d.Services)
                        .HasForeignKey(v => v.VehicleId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Vehicle>().HasOptional(a => a.Driver).WithMany(au => au.Vehicles)
                        .HasForeignKey(a => a.DriverId);
        }
    }
}