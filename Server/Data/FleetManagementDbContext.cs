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

            modelBuilder.Entity<Vehicle>()
                .HasRequired(s => s.Company)
                .WithMany(s => s.Vehicles)
                .HasForeignKey(s => s.CompanyId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Vehicle>()
              .HasRequired(s => s.Driver)
              .WithMany(s => s.Vehicles)
              .HasForeignKey(s => s.DriverId)
              .WillCascadeOnDelete(false);
        }
    }
}