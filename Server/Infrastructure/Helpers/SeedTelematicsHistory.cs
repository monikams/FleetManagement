using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Models;

namespace Infrastructure.Helpers
{
    public class SeedTelematicsHistory
    {
        public static async Task UpdateTelematicsHistory(TelematicsData telematicsData, FleetManagementDbContext dbContext)
        {        
                var newTelematicsDataHistory = new Data.Models.TelematicsDataHistory()
                {
                    VIN = telematicsData.VIN,
                    Mileage = telematicsData.Mileage,
                    FuelLevel = telematicsData.FuelLevel,
                    CurrentSpeed = telematicsData.CurrentSpeed,
                };
                dbContext.TelematicsDataHistories.Add(newTelematicsDataHistory);              
        }
    }
}