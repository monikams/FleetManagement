﻿using Infrastructure.Helpers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Linq;
using Data;
using Data.Models;
using Quartz;

namespace Infrastructure.JobScheduler.Jobs
{
    public class SendMileageOverdueEmailsJob : IJob
    {     
        public async Task Execute(IJobExecutionContext context)
        {
            using (FleetManagementDbContext dbContext = new FleetManagementDbContext())
            {
                var vehiclesVIN = dbContext.Vehicles.Select(v => v.VIN).ToList();
                
                foreach (var vehicleVIN in vehiclesVIN)
                {
                    var vehicleTelematics = await dbContext.TelematicsDatas.FirstOrDefaultAsync(t => t.VIN == vehicleVIN);
                    var vehicle = await dbContext.Vehicles.FirstOrDefaultAsync(v => v.VIN == vehicleVIN);

                    var services = dbContext.Services.Where(s => s.BasedOn == 1 && s.NextServiceMileage != null && s.NextServiceMileage < vehicleTelematics.Mileage).ToList();

                    foreach (var service in services)
                    {
                       MailHelper.SendEmail(service.Recipient, "Overdue service", $"The service {service.Name} for vehicle {vehicle.Brand} with plate number {vehicle.PlateNumber} is overdue.").RunSynchronously();
                    }
                }
            }
        }
    }
}