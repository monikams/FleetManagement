﻿namespace DataAccessService.Service
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Data;

    using DataAccessService.Contracts;
    using DataAccessService.Models;

    public class VehicleDataAccessService : IVehicleDataAccessService
    {
        private readonly MapperConfiguration _config;

        private readonly FleetManagementDbContext _context = new FleetManagementDbContext();

        private readonly IMapper _mapper;

        public VehicleDataAccessService()
        {
        }

        public VehicleDataAccessService(FleetManagementDbContext context)
        {
            this._context = context;
            this._config = new MapperConfiguration(
                cfg =>
                    {
                        cfg.CreateMap<Company, Data.Models.Company>().ReverseMap();
                        cfg.CreateMap<Driver, Data.Models.Driver>().ReverseMap();
                        cfg.CreateMap<Vehicle, Data.Models.Vehicle>()
                           .ForMember(v => v.Company, b => b.ResolveUsing(c => c.Company))
                           .ForMember( v => v.Driver, b => b.ResolveUsing(c => c.Driver))
                           .ReverseMap();
                    });
            this._mapper = new Mapper(this._config);
        }

        public async Task<IEnumerable<Vehicle>> GetCompanyVehicles(string companyId)
        {
            var vehicles = this._context.Vehicles.Where(v => v.Id == companyId).ToList();
            var mappedVehicles = this._mapper.Map<IEnumerable<Data.Models.Vehicle>, IEnumerable<Vehicle>>(vehicles);

            return await Task.Run(() => mappedVehicles);
        }

        public async Task<Vehicle> GetVehicleById(string vehicleId)
        {
            var vehicle = this._context.Vehicles.FirstOrDefault(v => v.Id == vehicleId);
            var mappedVehicle = this._mapper.Map<Data.Models.Vehicle, Vehicle>(vehicle);

            return await Task.Run(() => mappedVehicle);
        }

        public async Task<Vehicle> PostVehicle(string companyId, string driverId, Vehicle vehicle)
        {
            var company = await this._context.Companies.FindAsync(companyId);
            var driver = await this._context.Drivers.FindAsync(driverId);
            var newVehicle = new Data.Models.Vehicle
                                 {
                                     VIN = vehicle.VIN,
                                     PlateNumber = vehicle.PlateNumber,
                                     Brand = vehicle.Brand,
                                     Model = vehicle.Model,
                                     Company = company,
                                     Driver = driver
                                 };

            var addedVehicle = this._context.Vehicles.Add(newVehicle);
            this._context.SaveChanges();

            var mappedVehicle = this._mapper.Map<Data.Models.Vehicle, Vehicle>(addedVehicle);
            return await Task.Run(() => mappedVehicle);
        }
    }
}