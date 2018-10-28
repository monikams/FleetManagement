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
        private readonly IVehicleDataAccessService _vehicleDataAccessService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public VehicleBusinessService()
        {
        }

        public VehicleBusinessService(IVehicleDataAccessService vehicleDataAccessService)
        {
            _vehicleDataAccessService = vehicleDataAccessService;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Vehicle, DataAccessService.Models.Vehicle>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IEnumerable<Vehicle>> GetCompanyVehicles(string companyId)
        {
            var vehicles = await _vehicleDataAccessService.GetCompanyVehicles(companyId);
            var mappedVehicles = _mapper.Map<IEnumerable<DataAccessService.Models.Vehicle>, IEnumerable<Vehicle>>(vehicles);
            return mappedVehicles;
        }

        public async Task<Models.Vehicle> GetVehicleById(string vehicleId)
        {
            var vehicle = await _vehicleDataAccessService.GetVehicleById(vehicleId);
            var mappedVehicle = _mapper.Map<DataAccessService.Models.Vehicle, Vehicle>(vehicle);
            return mappedVehicle;
        }

        public async Task<Vehicle> PostVehicle(string companyId, string driverId, Vehicle vehicle)
        {
            var dataAccessVehicle = _mapper.Map<Vehicle, DataAccessService.Models.Vehicle>(vehicle);
            var businessServiceVehicle = await _vehicleDataAccessService.PostVehicle(companyId, driverId, dataAccessVehicle);
            var mappedVehicle = _mapper.Map<DataAccessService.Models.Vehicle, Vehicle>(businessServiceVehicle);
            return mappedVehicle;
        }
    }
}
