﻿using System;
using Infrastructure.Helpers;

namespace DataAccessService.Service
{
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Data;

    using DataAccessService.Contracts;
    using DataAccessService.Models;

    public class ServiceDataAccessService : IServiceDataAccessService
    {
        private readonly MapperConfiguration _config;

        private readonly FleetManagementDbContext _context = new FleetManagementDbContext();

        private readonly IMapper _mapper;

        public ServiceDataAccessService()
        {
        }

        public ServiceDataAccessService(FleetManagementDbContext context)
        {
            this._context = context;
            this._config =
                new MapperConfiguration(
                    cfg =>
                        {
                            cfg.CreateMap<Service, Data.Models.Service>().ReverseMap();
                            cfg.CreateMap<Data.Models.Service, Service>().ReverseMap();
                            cfg.CreateMap<EditService, Data.Models.Service>().ReverseMap();
                            cfg.CreateMap<PostService, Data.Models.Service>().ReverseMap();
                        });
            this._mapper = new Mapper(this._config);
        }

        public async Task<Service> GetById(string id)
        {
            var service = await this._context.Services.FirstOrDefaultAsync(s => s.Id == id);
            var mappedService = this._mapper.Map<Data.Models.Service, Service>(service);

            return mappedService;
        }

        public async Task<IEnumerable<Service>> GetByVehicleId(string vehicleId, bool filterByOverdue)
        {
            IList<Data.Models.Service> services = new List<Data.Models.Service>();
            if (filterByOverdue)
            {
                var currentTime = await this._context.Database.SqlQuery<DateTime>("SELECT GETUTCDATE()").FirstOrDefaultAsync();
                var now = new DateTimeOffset(new DateTime(currentTime.Year, currentTime.Month, currentTime.Day, currentTime.Hour, currentTime.Minute, currentTime.Second, DateTimeKind.Utc));
                var vehicle = await this._context.Vehicles.FirstOrDefaultAsync(v => v.Id == vehicleId);
                var vehicleTelematics = await this._context.TelematicsDatas.FirstOrDefaultAsync(t => t.VIN == vehicle.VIN);

                services = await this._context.Services.Where(s => s.VehicleId == vehicleId && ((s.BasedOn == 0 && s.NextServiceTime != null && DbFunctions.TruncateTime(s.NextServiceTime) < DbFunctions.TruncateTime(now)) || (s.BasedOn == 1 && s.NextServiceMileage != null && s.NextServiceMileage < vehicleTelematics.Mileage))).ToListAsync();
            }
            else
            {
                services = await this._context.Services.Where(s => s.VehicleId == vehicleId).ToListAsync();
            }

            var mappedServices = this._mapper.Map<IEnumerable<Data.Models.Service>, IEnumerable<Service>>(services);

            return mappedServices;
        }

        public async Task<Service> PostService(PostService service)
        {
            var vehicle = await this._context.Vehicles.FirstOrDefaultAsync(v => v.Id == service.VehicleId);
            if (vehicle == null)
            {
                return null;
            }

            var newService = this._mapper.Map<PostService, Data.Models.Service>(service);

            this._context.Services.Add(newService);
            await this._context.SaveChangesAsync();
            await NextServiceCalculation.CalculateNextService(newService.Id, _context);

            var mappedService = this._mapper.Map<Data.Models.Service, Service>(newService);
            return mappedService;
        }

        public async Task<Service> EditService(EditService serviceForEdit)
        {
            var service = await _context.Services.FindAsync(serviceForEdit.Id);
            if (service == null)
            {
                return null;
            }

            service.Name = serviceForEdit.Name;
            service.Recipient = serviceForEdit.Recipient;
            service.Description = serviceForEdit.Description;
            service.MileageReminder = serviceForEdit.MileageReminder;
            service.MileageRule = serviceForEdit.MileageRule;
            service.TimeReminder = serviceForEdit.TimeReminder;
            service.TimeReminderEntity = serviceForEdit.TimeReminderEntity;
            service.TimeRule = serviceForEdit.TimeRule;
            service.TimeRuleEntity = serviceForEdit.TimeRuleEntity;
            service.BasedOn = serviceForEdit.BasedOn;

            await _context.SaveChangesAsync();
            await NextServiceCalculation.CalculateNextService(service.Id, _context);

            return this._mapper.Map<Data.Models.Service, Service>(service);
        }

        public async Task MarkServiceAsDone(string serviceId)
        {
            await NextServiceCalculation.CalculateNextService(serviceId, _context);
        }

        public async Task DeleteService(string serviceId)
        {
            var service = this._context.Services.FirstOrDefault(x => x.Id == serviceId);
            if (service != null)
            {
                this._context.Services.Remove(service);
                await this._context.SaveChangesAsync();
            }
        }
    }
}