using Data;
using Data.Models;
using Infrastructure.Helpers;
using Quartz;
using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.JobScheduler.Jobs
{
    public class SeedTelematicsJob : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                using (FleetManagementDbContext dbContext = new FleetManagementDbContext())
                {
                    var vehicles = await dbContext.Vehicles.ToListAsync();
                    foreach (var vehicle in vehicles)
                    {
                        var telematicsData =
                            await dbContext.TelematicsDatas.FirstOrDefaultAsync(t => t.VIN == vehicle.VIN);
                        var lastTelematicsDataHistory = await dbContext
                                                .TelematicsDataHistories.Where(x => x.VIN == telematicsData.VIN)
                                                .OrderByDescending(x => x.Modified).FirstOrDefaultAsync();

                        TelematicsData newTelematicsData = new TelematicsData
                        {
                            VIN = vehicle.VIN,
                            Mileage = TelematicsDataGenerator.GenerateNextMileageValue(telematicsData?.Mileage),
                            FuelLevel = TelematicsDataGenerator.GenerateNextFuelLevelValue(telematicsData?.FuelLevel),
                            CurrentSpeed =
                                TelematicsDataGenerator.GenerateNextCurrentSpeedValue(telematicsData?.CurrentSpeed),
                            WorkingTime = telematicsData?.WorkingTime != null
                                ? telematicsData.WorkingTime += TimeSpan.FromMinutes(1)
                                : new TimeSpan(0, 0, 1, 0),
                        };

                        newTelematicsData.Idling = newTelematicsData.Idling.HasValue
                            ? telematicsData?.CurrentSpeed == 0
                                ? telematicsData.Idling += TimeSpan.FromMinutes(3)
                                : new TimeSpan(0, 0, 0, 0)
                            : new TimeSpan(0, 0, 3, 0);

                        if (telematicsData == null)
                        {
                            dbContext.TelematicsDatas.Add(newTelematicsData);
                        }
                        else
                        {
                            telematicsData.Mileage = newTelematicsData.Mileage;
                            telematicsData.FuelLevel = newTelematicsData.FuelLevel;
                            telematicsData.CurrentSpeed = newTelematicsData.CurrentSpeed;
                            telematicsData.WorkingTime = newTelematicsData.WorkingTime;
                            telematicsData.Idling = newTelematicsData.Idling;
                        }

                        await SeedTelematicsHistory.UpdateTelematicsHistory(newTelematicsData, dbContext);
                    }

                    await dbContext.SaveChangesAsync();
                }
            }
            catch (Exception exception)
            {
                throw exception;
            }
        }
    }
}