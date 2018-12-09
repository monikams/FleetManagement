namespace BusinessService.Service
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;

    using BusinessService.Contracts;
    using BusinessService.Models;

    using DataAccessService.Contracts;

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
            this._vehicleDataAccessService = vehicleDataAccessService;
            this._config = new MapperConfiguration(
                cfg =>
                    {
                        cfg.CreateMap<Company, DataAccessService.Models.Company>().ReverseMap();
                        cfg.CreateMap<Driver, DataAccessService.Models.Driver>().ReverseMap();
                        cfg.CreateMap<Vehicle, DataAccessService.Models.Vehicle>()
                           .ForMember(v => v.Company, b => b.ResolveUsing(c => c.Company))
                           .ForMember(v => v.Driver, b => b.ResolveUsing(c => c.Driver))
                           .ReverseMap();
                    });
            this._mapper = new Mapper(this._config);
        }

        public async Task<IEnumerable<Vehicle>> GetCompanyVehicles(string companyId)
        {
            var vehicles = await this._vehicleDataAccessService.GetCompanyVehicles(companyId);
            var mappedVehicles =
                this._mapper.Map<IEnumerable<DataAccessService.Models.Vehicle>, IEnumerable<Vehicle>>(vehicles);
            return mappedVehicles;
        }

        public async Task<Vehicle> GetVehicleById(string vehicleId)
        {
            var vehicle = await this._vehicleDataAccessService.GetVehicleById(vehicleId);
            var mappedVehicle = this._mapper.Map<DataAccessService.Models.Vehicle, Vehicle>(vehicle);
            return mappedVehicle;
        }

        public async Task<Vehicle> PostVehicle(Vehicle vehicle)
        {
            var dataAccessVehicle = this._mapper.Map<Vehicle, DataAccessService.Models.Vehicle>(vehicle);
            var businessServiceVehicle =
                await this._vehicleDataAccessService.PostVehicle(dataAccessVehicle);
            var mappedVehicle = this._mapper.Map<DataAccessService.Models.Vehicle, Vehicle>(businessServiceVehicle);
            return mappedVehicle;
        }
    }
}