namespace WebApiService.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;

    using AutoMapper;

    using BusinessService.Contracts;

    using WebApiService.Controllers.Base;
    using WebApiService.Models;

    [RoutePrefix("api")]
    public class ServiceController : BaseAuthorizationController
    {
        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        private readonly IServiceBusinessService _serviceBusinessService;

        private readonly IVehicleBusinessService _vehicleBusinessService;

        public ServiceController(
            IServiceBusinessService serviceBusinessService,
            IVehicleBusinessService vehicleBusinessService,
            IUserBusinessService userBusinessService)
            : base(userBusinessService)
        {
            this._serviceBusinessService = serviceBusinessService;
            this._vehicleBusinessService = vehicleBusinessService;
            this._config = new MapperConfiguration(
                cfg => { cfg.CreateMap<Service, BusinessService.Models.Service>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
        }

        [Route("services/{serviceId}")]
        [HttpGet]
        public async Task<Service> GetById([FromUri] string serviceId)
        {
            var service = await this._serviceBusinessService.GetById(serviceId);
            var mappedService = this._mapper.Map<BusinessService.Models.Service, Service>(service);

            return mappedService;
        }

        [Route("services/vehicle/{vehicleId}")]
        [HttpGet]
        public async Task<IEnumerable<Service>> GetByVehicleId([FromUri] string vehicleId)
        {
            var vehicle = await this._vehicleBusinessService.GetVehicleById(vehicleId);
            if (vehicle == null)
            {
                return null;
            }

            var services = await this._serviceBusinessService.GetByVehicleId(vehicleId);
            var mappedServices =
                this._mapper.Map<IEnumerable<BusinessService.Models.Service>, IEnumerable<Service>>(services);

            return mappedServices;
        }

        [Route("services")]
        [HttpPost]
        public async Task<IHttpActionResult> PostService([FromBody] Service service)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var apiService = this._mapper.Map<Service, BusinessService.Models.Service>(service);
            var newService = await this._serviceBusinessService.PostService(apiService);
            var mappedCompany = this._mapper.Map<BusinessService.Models.Service, Service>(newService);

            return this.Ok(mappedCompany);
        }
    }
}