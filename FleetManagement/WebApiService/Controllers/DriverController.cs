namespace WebApiService.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;

    using AutoMapper;

    using BusinessService.Models;
    using BusinessService.Service;

    [RoutePrefix("api")]
    public class DriverController : ApiController
    {
        private readonly IDriverBusinessService _driverBusinessService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public DriverController(IDriverBusinessService driverBusinessService)
        {
            _driverBusinessService = driverBusinessService;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Models.Driver, BusinessService.Models.Driver>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        [Route("companies/{companyId}/Drivers")]
        [HttpGet]
        public async Task<IEnumerable<Driver>> GetDrivers([FromUri] string companyId)
        {
            var drivers = await _driverBusinessService.GetCompanyDrivers(companyId);
            var mappedDrivers = _mapper.Map<IEnumerable<BusinessService.Models.Driver>, IEnumerable<Driver>>(drivers);
            return mappedDrivers;
        }

        [Route("companies/{companyId}/Drivers/{DriverId}")]
        [HttpGet]
        public async Task<Driver> GetDriverById([FromUri] string companyId, [FromUri] string driverId)
        {
            var driver = await _driverBusinessService.GetDriverById(driverId);
            var mappedDriver = _mapper.Map<BusinessService.Models.Driver, Driver>(driver);
            return mappedDriver;
        }

        [Route("companies/{companyId}/Drivers")]
        [HttpPost]
        public async Task<IHttpActionResult> PostDriver([FromUri] string companyId, [FromUri] string driverId, [FromBody] Driver Driver)
        {
            if (!ModelState.IsValid)
                return this.BadRequest(ModelState);

            var apiDriver = _mapper.Map<Driver, BusinessService.Models.Driver>(Driver);
            var businessServiceDriver = await _driverBusinessService.PostDriver(companyId,
              apiDriver);
            var mappedDriver = _mapper.Map<BusinessService.Models.Driver, Driver>(businessServiceDriver);
            return Ok(mappedDriver);
        }
    }
}
