using Infrastructure.Helpers;
using System;
using System.Threading.Tasks;
using System.Data.Entity;
using Data;
using Data.Models;
using Quartz;

namespace Infrastructure.JobScheduler.Jobs
{
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
                    TelematicsData newTelematicsData = new TelematicsData
                    {
                        VIN = vehicle.VIN,
                        Mileage = random.Next(100000, 200000),
                        FuelLevel = random.Next(0, 100),
                    };

                    if (telematicsData == null)
                    {            
                        dbContext.TelematicsDatas.Add(newTelematicsData);                        
                    }
                    else
                    {
                        telematicsData.Mileage = newTelematicsData.Mileage;
                        telematicsData.FuelLevel = newTelematicsData.FuelLevel;
                    }

                    await SeedTelematicsHistory.UpdateTelematicsHistory(newTelematicsData, dbContext);
                }

                await dbContext.SaveChangesAsync();
            }
        }
    }
}