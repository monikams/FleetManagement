using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data;
using Data.Models;

namespace Infrastructure.Helpers
{
    public class NextServiceCalculation
    {
        public static async Task CalculateNextService(string serviceId, FleetManagementDbContext context)
        {
            var service = await context.Services.FirstOrDefaultAsync(s => s.Id == serviceId);
            if (service == null)
            {
                return;
            }

            // BasedOn == time
            if (service.BasedOn == 0)
            {
                var currentTime = await context.Database.SqlQuery<DateTime>("SELECT GETUTCDATE()").FirstOrDefaultAsync();
                var newCreatedTime = new DateTimeOffset(new DateTime(currentTime.Year, currentTime.Month, currentTime.Day, currentTime.Hour, currentTime.Minute, currentTime.Second, DateTimeKind.Utc));

                service.Created = newCreatedTime;
                service.NextServiceTime = CalculateNextServiceTime(service);
                service.NextServiceReminderTime = CalculateNextServiceReminderTime(service);
            }
            // BasedOn == mileage
            else
            {
                var mileage = await context.TelematicsDatas.FirstOrDefaultAsync(t => t.VIN == service.Vehicle.VIN);
                if (mileage != null)
                {
                    service.NextServiceMileage = CalculateNextServiceMileage(service, mileage.Mileage);
                    service.NextServiceReminderMileage = CalculateNextServiceReminderMileage(service, mileage.Mileage);
                }
            }

            await context.SaveChangesAsync();
        }

        public static DateTimeOffset? CalculateNextServiceTime(Service service)
        {
            if (!service.Created.HasValue || !service.TimeRule.HasValue)
            {
                return null;
            }

            DateTimeOffset? nextServiceTime = null;
            switch (service.TimeRuleEntity)
            {
                case 1:
                    {
                        nextServiceTime = service.Created.Value.AddDays(service.TimeRule.Value);
                        break;
                    }
                case 2:
                    {
                        nextServiceTime = service.Created.Value.AddMonths(service.TimeRule.Value);
                        break;
                    }
                case 3:
                    {
                        nextServiceTime = service.Created.Value.AddYears(service.TimeRule.Value);
                        break;
                    }
            }

            return nextServiceTime;
        }

        public static DateTimeOffset? CalculateNextServiceReminderTime(Service service)
        {
            if (!service.Created.HasValue || !service.TimeReminder.HasValue)
            {
                return null;
            }

            DateTimeOffset? nextServiceReminderTime = null;
            switch (service.TimeRuleEntity)
            {
                case 1:
                    {
                        nextServiceReminderTime = service.Created.Value.AddDays(service.TimeReminder.Value);
                        break;
                    }
                case 2:
                    {
                        nextServiceReminderTime = service.Created.Value.AddMonths(service.TimeReminder.Value);
                        break;
                    }
                case 3:
                    {
                        nextServiceReminderTime = service.Created.Value.AddYears(service.TimeReminder.Value);
                        break;
                    }
            }

            return nextServiceReminderTime;
        }


        public static int? CalculateNextServiceMileage(Service service, int? mileage)
        {
            var nextServiceMileage = mileage + service.MileageRule;
            return nextServiceMileage;
        }

        public static int? CalculateNextServiceReminderMileage(Service service, int? mileage)
        {
            var nextServiceReminderMileage = mileage + service.MileageReminder;
            return nextServiceReminderMileage;
        }
    }
}
