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
    public class VehicleController : BaseAuthorizationController
    {
        private readonly IVehicleBusinessService _vehicleBusinessService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public VehicleController(IVehicleBusinessService vehicleBusinessService, IUserBusinessService userBusinessService)
            : base(userBusinessService)
        {
            _vehicleBusinessService = vehicleBusinessService;
            _config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Company, BusinessService.Models.Company>().ReverseMap();
                cfg.CreateMap<Driver, BusinessService.Models.Driver>().ReverseMap();
                cfg.CreateMap<Vehicle, BusinessService.Models.Vehicle>()
                   .ForMember(v => v.Company, b => b.ResolveUsing(c => c.Company))
                   .ForMember(v => v.Driver, b => b.ResolveUsing(c => c.Driver))
                   .ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        [Route("companies/{companyId}/vehicles")]
        [HttpGet]
        public async Task<IEnumerable<Vehicle>> GetVehicles([FromUri] string companyId)
        {
            var vehicles = await _vehicleBusinessService.GetCompanyVehicles(companyId);
            var mappedVehicles = _mapper.Map<IEnumerable<BusinessService.Models.Vehicle>, IEnumerable<Vehicle>>(vehicles);
            return mappedVehicles;
        }

        [Route("vehicles/{vehicleId}")]
        [HttpGet]
        public async Task<Vehicle> GetVehicleById([FromUri] string vehicleId)
        {
            var vehicle = await _vehicleBusinessService.GetVehicleById(vehicleId);
            var mappedVehicle = _mapper.Map<BusinessService.Models.Vehicle, Vehicle>(vehicle);
            return mappedVehicle;
        }

        [Route("vehicles")]
        [HttpPost]
        public async Task<IHttpActionResult> PostVehicle([FromBody] Vehicle vehicle)
        {
            if (!ModelState.IsValid)
                return this.BadRequest(ModelState);

            var apiVehicle = _mapper.Map<Vehicle, BusinessService.Models.Vehicle>(vehicle);
            var businessServiceVehicle = await _vehicleBusinessService.PostVehicle(apiVehicle);
            var mappedVehicle = _mapper.Map<BusinessService.Models.Vehicle, Vehicle>(businessServiceVehicle);
            return Ok(mappedVehicle);
        }

        [Route("deleteVehicle/{vehicleId}")]
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteVehicle([FromUri] string vehicleId)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var vehicle = await this._vehicleBusinessService.GetVehicleById(vehicleId);
            if (vehicle == null)
            {
                return this.BadRequest();
            }

            await this._vehicleBusinessService.DeleteVehicle(vehicleId);
            return this.Ok();
        }

        [Route("vehicles/{vehicleId}")]
        [HttpPut]
        public async Task<IHttpActionResult> EditVehicle([FromUri] string vehicleId, [FromBody] EditVehicle vehicleForEdit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = await _vehicleBusinessService.GetVehicleById(vehicleId);
            if (vehicle == null)
            {
                return this.BadRequest();
            }

            var businessVehicleForEdit = _mapper.Map<BusinessService.Models.EditVehicle>(vehicleForEdit);
            businessVehicleForEdit.Id = vehicleId;

            var editedVehicle = await _vehicleBusinessService.EditVehicle(businessVehicleForEdit);
            var apiVehicle = _mapper.Map<EditVehicle>(editedVehicle);
            return Ok(apiVehicle);
        }
    }
}
