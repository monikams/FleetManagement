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
    public class VehicleBusinessService : IVehicleBusinessService<Vehicle, Guid>
    {
        private readonly IVehicleDataAccessService<DataAccessService.Models.Vehicle, Guid> _vehicleDataAccesService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public VehicleBusinessService(IVehicleDataAccessService<DataAccessService.Models.Vehicle, Guid> vehicleDataAccesService)
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

        //public async Task<Vehicle> GetById(Guid VehicleId)
        //{
        //    var Vehicle = await _VehicleDataAccesService.GetById(VehicleId);
        //    var mappedVehicle = _mapper.Map<DataAccessService.Models.Vehicle, Vehicle>(Vehicle);
        //    return mappedVehicle;
        //}

        //public async Task<Vehicle> PostItem(Vehicle Vehicle)
        //{
        //    var dataAccessVehicle = _mapper.Map<Vehicle, DataAccessService.Models.Vehicle>(Vehicle);
        //    var businessServiceVehicle = await _VehicleDataAccesService.PostItem(dataAccessVehicle);
        //    var mappedVehicle = _mapper.Map<DataAccessService.Models.Vehicle, Vehicle>(businessServiceVehicle);
        //    return mappedVehicle;
        //}

    }
}
