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
    public class DriverController : BaseAuthorizationController
    {
        private readonly IDriverBusinessService _driverBusinessService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public DriverController(IDriverBusinessService driverBusinessService, IUserBusinessService userBusinessService)
            : base(userBusinessService)
        {
            _driverBusinessService = driverBusinessService;
            _config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Company, BusinessService.Models.Company>().ReverseMap();
                cfg.CreateMap<Driver, BusinessService.Models.Driver>()
                   .ForMember(x => x.Company, b => b.ResolveUsing(c => c.Company)).ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        [Route("companies/{companyId}/getDrivers")]
        [HttpGet]
        public async Task<IEnumerable<Driver>> GetDrivers([FromUri] string companyId)
        {
            var drivers = await _driverBusinessService.GetCompanyDrivers(companyId);
            var mappedDrivers = _mapper.Map<IEnumerable<BusinessService.Models.Driver>, IEnumerable<Models.Driver>>(drivers);
            return mappedDrivers;
        }

        [Route("drivers/{driverId}")]
        [HttpGet]
        public async Task<Driver> GetDriverById([FromUri] string driverId)
        {
            var driver = await _driverBusinessService.GetDriverById(driverId);
            var mappedDriver = _mapper.Map<BusinessService.Models.Driver, Driver>(driver);
            return mappedDriver;
        }

        [Route("drivers")]
        [HttpPost]
        public async Task<IHttpActionResult> PostDriver([FromBody] Driver driver)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(ModelState);
            }

            var apiDriver = _mapper.Map<Driver, BusinessService.Models.Driver>(driver);
            var businessServiceDriver = await _driverBusinessService.PostDriver(driver.CompanyId,
              apiDriver);
            var mappedDriver = _mapper.Map<BusinessService.Models.Driver, Driver>(businessServiceDriver);
            return Ok(mappedDriver);
        }

        [Route("deleteDriver/{driverId}")]
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteDriver([FromUri] string driverId)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var driver = await this._driverBusinessService.GetDriverById(driverId);
            if (driver == null)
            {
                return this.BadRequest();
            }

            await this._driverBusinessService.DeleteDriver(driverId);
            return this.Ok();
        }
    }
}
