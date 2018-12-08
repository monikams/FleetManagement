namespace BusinessService.Service
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;

    using BusinessService.Contracts;
    using BusinessService.Models;

    using DataAccessService.Contracts;

    public class ServiceBusinessService : IServiceBusinessService
    {
        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        private readonly IServiceDataAccessService _serviceDataAccessService;

        public ServiceBusinessService()
        {
        }

        public ServiceBusinessService(IServiceDataAccessService serviceDataAccessService)
        {
            this._serviceDataAccessService = serviceDataAccessService;
            this._config = new MapperConfiguration(
                cfg => { cfg.CreateMap<Service, DataAccessService.Models.Service>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
        }

        public async Task<Service> GetById(string id)
        {
            var service = await this._serviceDataAccessService.GetById(id);
            var mappedService = this._mapper.Map<DataAccessService.Models.Service, Service>(service);

            return mappedService;
        }

        public async Task<IEnumerable<Service>> GetByVehicleId(string vehicleId)
        {
            var services = await this._serviceDataAccessService.GetByVehicleId(vehicleId);
            var mappedServices =
                this._mapper.Map<IEnumerable<DataAccessService.Models.Service>, IEnumerable<Service>>(services);

            return mappedServices;
        }
    }
}