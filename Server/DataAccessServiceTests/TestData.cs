using System;
using Service = Data.Models.Service;
using Vehicle = Data.Models.Vehicle;

namespace DataAccessServiceTests
{
    public static class TestData
    {
        public static Vehicle[] Vehicles = new[]
          {
            new Vehicle
            {
                Id = Guid.NewGuid().ToString(),
                VIN = "3C6JR6AG8DG538799",
                PlateNumber = "136-SMTR",
                Type = "car",
                Brand = "Toyota",
            },
            new Vehicle
            {
                Id = Guid.NewGuid().ToString(),
                VIN = "ASWJR6AG8DG538799",
                PlateNumber = "1422-SM2",
                Type = "car",
                Brand = "Ford",
            }
        };

        public static Service[] Services = new[]
        {
            new Service
            {
                BasedOn = 0,
                Created = DateTimeOffset.Now.AddDays(-1).AddHours(-5),
                Description = "",
                Id = Guid.NewGuid().ToString(),
                MileageReminder = 0,
                MileageRule = 0,
                Name = "Car Wash",
                NextServiceMileage = null,
                NextServiceReminderMileage = null,
                NextServiceReminderTime = DateTimeOffset.Now.AddDays(4),
                NextServiceTime = DateTimeOffset.Now.AddDays(10),
                Recipient = "monikaspasova1@gmail.com",
                TimeReminder = 2,
                TimeReminderEntity = 1,
                TimeRule = 1,
                TimeRuleEntity = 2,
                Vehicle = Vehicles[0],
                VehicleId =  Vehicles[0].Id
            },
            new Service
            {
                BasedOn = 1,
                Created = DateTimeOffset.Now.AddDays(-1).AddHours(-5),
                Description = "",
                Id = Guid.NewGuid().ToString(),
                MileageReminder = 200,
                MileageRule = 10000,
                Name = "Change the oil",
                NextServiceMileage = 100000,
                NextServiceReminderMileage = 80000,
                NextServiceReminderTime = new DateTimeOffset(),
                NextServiceTime = new DateTimeOffset(),
                Recipient = "monikaspasova1@gmail.com",
                TimeReminder = null,
                TimeReminderEntity = null,
                TimeRule = null,
                TimeRuleEntity = null,
                Vehicle = Vehicles[1],
                VehicleId =  Vehicles[1].Id
            }
        };
    }
}
