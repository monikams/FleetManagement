namespace DataAccessService.Service
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Data;

    using DataAccessService.Contracts;

    public class VehicleDataAccessService : IVehicleDataAccessService
    {
        private readonly FleetManagementDbContext _context = new FleetManagementDbContext();
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public VehicleDataAccessService()
        {
        }

        public VehicleDataAccessService(FleetManagementDbContext context)
        {
            _context = context;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Models.Vehicle, Data.Models.Vehicle>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IEnumerable<Models.Vehicle>> GetCompanyVehicles(string companyId)
        {
            var vehicles = _context.Vehicles.Where(v => v.Id == companyId).ToList();
            var mappedVehicles = _mapper.Map<IEnumerable<Data.Models.Vehicle>, IEnumerable<Models.Vehicle>>(vehicles);

            return await Task.Run(() => mappedVehicles);
        }

        public async Task<Models.Vehicle> GetVehicleById(string vehicleId)
        {
            var vehicle =  _context.Vehicles.FirstOrDefault(v => v.Id == vehicleId);
            var mappedVehicle = _mapper.Map<Data.Models.Vehicle, Models.Vehicle>(vehicle);

            return await Task.Run(() => mappedVehicle);
        }

        public async Task<Models.Vehicle> PostVehicle(string companyId, string driverId, Models.Vehicle vehicle)
        {
            var company = await _context.Companies.FindAsync(companyId);
            var driver = await _context.Drivers.FindAsync(driverId);
            var newVehicle = new Data.Models.Vehicle
            {
                VIN = vehicle.VIN,
                PlateNumber = vehicle.PlateNumber,                
                Brand = vehicle.Brand,
                Model = vehicle.Model,
                Company = company,
                Driver = driver,                
            };

            var addedVehicle = _context.Vehicles.Add(newVehicle);
            this._context.SaveChanges();

            var mappedVehicle = _mapper.Map<Data.Models.Vehicle, Models.Vehicle>(addedVehicle);
            return await Task.Run(() => mappedVehicle);
        }
    }
}
