namespace WebApiService.Infrastructure.JobScheduler.Jobs
{
    using System;
    using System.Threading.Tasks;

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
                dbContext.TelematicsDatas.Add(
                    new TelematicsData
                        {
                            FuelLevel = random.Next(0, 100),
                            VIN = random.Next(10000, 100000).ToString()
                        });
                await dbContext.SaveChangesAsync();
            }
        }
    }
}