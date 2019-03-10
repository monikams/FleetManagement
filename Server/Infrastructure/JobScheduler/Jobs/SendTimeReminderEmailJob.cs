using Infrastructure.Helpers;
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
    public class SendTimeReminderEmailJob : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            using (FleetManagementDbContext dbContext = new FleetManagementDbContext())
            {
                var currentTime = await dbContext.Database.SqlQuery<DateTime>("SELECT GETUTCDATE()").FirstOrDefaultAsync();
                var todaysDate = new DateTimeOffset(new DateTime(currentTime.Year, currentTime.Month, currentTime.Day, currentTime.Hour, currentTime.Minute, currentTime.Second, DateTimeKind.Utc));

                var services = dbContext.Services.Where(s =>
                    (s.BasedOn == 0 && s.NextServiceReminderTime != null && DbFunctions.TruncateTime(s.NextServiceReminderTime) == DbFunctions.TruncateTime(todaysDate))).ToList();

                foreach (var service in services.ToList())
                {
                    MailHelper.SendEmail(service.Recipient, "Reminder services", $"The service {service.Name} for vehicle {service.Vehicle.Brand} with plate number {service.Vehicle.PlateNumber} is following.").RunSynchronously();
                }              
            }
        }
    }
}