using AutoMapper;
using DataAccessService.Models;
using EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace DataAccessService.Service
{
    public class VehicleDataAccessService : IVehicleDataAccessService
    {
        private readonly FleetManagementContext _context = new FleetManagementContext();
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public VehicleDataAccessService()
        {
        }

        public VehicleDataAccessService(FleetManagementContext context)
        {
            _context = context;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Models.Vehicle, EntityModel.Vehicle>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IQueryable<Models.Vehicle>> GetCompanyVehicles(Guid companyId)
        {
            var vehicles = _context.Vehicles.Where(v => v.Id == companyId);

            var mappedVehicles = _mapper.Map<IEnumerable<EntityModel.Vehicle>, IEnumerable<Models.Vehicle>>(vehicles);

            return await Task.Run(() => mappedVehicles.AsQueryable());
        }

        public async Task<Models.Vehicle> GetVehicleById(Guid vehicleId)
        {
            var vehicle =  _context.Vehicles.FirstOrDefault(v => v.Id == vehicleId);

            var mappedVehicle = _mapper.Map<EntityModel.Vehicle, Models.Vehicle>(vehicle);

            return await Task.Run(() => mappedVehicle);
        }

        public async Task<Models.Vehicle> PostVehicle(Guid companyId, Guid driverId, Models.Vehicle vehicle)
        {
            var company = await _context.Companies.FindAsync(companyId);
            var driver = await _context.Drivers.FindAsync(driverId);

            var newVehicle = new EntityModel.Vehicle
            {
                VIN = vehicle.VIN,
                PlateNumber = vehicle.PlateNumber,                
                Brand = vehicle.Brand,
                Model = vehicle.Model,
                Company = company,
                Driver = driver,                
            };

            var addedVehicle = _context.Vehicles.Add(newVehicle);
            var mappedVehicle = _mapper.Map<EntityModel.Vehicle, Models.Vehicle>(addedVehicle);
            return await Task.Run(() => mappedVehicle);
        }
    }
}
