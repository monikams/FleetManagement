using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessService.Service;
using BusinessService.Models;
using AutoMapper;

namespace BusinessService.Service
{
    public class VehicleBusinessService : IVehicleBusinessService
    {
        private readonly IVehicleDataAccessService _vehicleDataAccesService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public VehicleBusinessService()
        {
        }

        public VehicleBusinessService(IVehicleDataAccessService vehicleDataAccesService)
        {
            _vehicleDataAccesService = vehicleDataAccesService;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Vehicle, DataAccessService.Models.Vehicle>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IQueryable<Vehicle>> GetCompanyVehicles(Guid companyId)
        {
            var vehicles = await _vehicleDataAccesService.GetCompanyVehicles(companyId);
            var mappedVehicles = _mapper.Map<IQueryable<DataAccessService.Models.Vehicle>, IQueryable<Vehicle>>(vehicles);
            return mappedVehicles;
        }

        public async Task<Models.Vehicle> GetVehicleById(Guid vehicleId)
        {
            var vehicle = await _vehicleDataAccesService.GetVehicleById(vehicleId);
            var mappedVehicle = _mapper.Map<DataAccessService.Models.Vehicle, Vehicle>(vehicle);
            return mappedVehicle;
        }

        public async Task<Vehicle> PostVehicle(Guid companyId, Guid driverId, Vehicle vehicle)
        {
            var dataAccessVehicle = _mapper.Map<Vehicle, DataAccessService.Models.Vehicle>(vehicle);
            var businessServiceVehicle = await _vehicleDataAccesService.PostVehicle(companyId, driverId, dataAccessVehicle);
            var mappedVehicle = _mapper.Map<DataAccessService.Models.Vehicle, Vehicle>(businessServiceVehicle);
            return mappedVehicle;
        }
    }
}
