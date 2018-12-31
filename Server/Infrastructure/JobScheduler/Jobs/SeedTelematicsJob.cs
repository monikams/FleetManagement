namespace Infrastructure.JobScheduler.Jobs
{
    using System;
    using System.Threading.Tasks;
    using System.Data.Entity;

    using Data;
    using Data.Models;

    using Quartz;

    public class SeedTelematicsJob : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            Random random = new Random();
            using (FleetManagementDbContext dbContext = new FleetManagementDbContext())
            {
                var vehicles = await dbContext.Vehicles.ToListAsync();
                foreach (var vehicle in vehicles)
                {
                    var telematicsData = await dbContext.TelematicsDatas.FirstOrDefaultAsync(t => t.VIN == vehicle.VIN);
                    if (telematicsData == null)
                    {
                        dbContext.TelematicsDatas.Add(
                            new TelematicsData
                            {
                                FuelLevel = random.Next(0, 100),
                                VIN = vehicle.VIN,
                                Mileage = random.Next(100000, 200000)
                            });
                    }
                }

                await dbContext.SaveChangesAsync();
            }
        }
    }
}