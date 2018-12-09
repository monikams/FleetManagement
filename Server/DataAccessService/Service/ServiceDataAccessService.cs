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
                        });
            this._mapper = new Mapper(this._config);
        }

        public async Task<Service> GetById(string id)
        {
            var service = await this._context.Services.FirstOrDefaultAsync(s => s.Id == id);
            var mappedService = this._mapper.Map<Data.Models.Service, Service>(service);

            return mappedService;
        }

        public async Task<IEnumerable<Service>> GetByVehicleId(string vehicleId)
        {
            var services = await this._context.Services.Where(s => s.VehicleId == vehicleId).ToListAsync();
            var mappedServices = this._mapper.Map<IEnumerable<Data.Models.Service>, IEnumerable<Service>>(services);

            return mappedServices;
        }

        public async Task<Service> PostService(Service service)
        {
            var vehicle = await this._context.Vehicles.FirstOrDefaultAsync(v => v.Id == service.VehicleId);
            if (vehicle == null)
            {
                return null;
            }

            var newService = this._mapper.Map<Service, Data.Models.Service>(service);

            this._context.Services.Add(newService);
            await this._context.SaveChangesAsync();

            var mappedService = this._mapper.Map<Data.Models.Service, Service>(newService);
            return mappedService;
        }
    }
}