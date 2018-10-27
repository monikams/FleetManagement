using System.Web.Http;
using AutoMapper;
using WebApiService.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessService.Service;

namespace WebApiService.Controllers
{
    [RoutePrefix("api")]
    public class VehicleController : ApiController
    {
        private readonly IVehicleBusinessService<BusinessService.Models.Vehicle, Guid> _vehicleBusinessService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public VehicleController(IVehicleBusinessService<BusinessService.Models.Vehicle, Guid> vehicleBusinessService)
        {
            _vehicleBusinessService = vehicleBusinessService;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Models.Vehicle, BusinessService.Models.Vehicle>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        [Route("companies/{companyId}/vehicles}")]
        [HttpGet]
        public async Task<IEnumerable<Vehicle>> GetVehicles([FromUri] Guid companyId)
        {
            var vehicles = await _vehicleBusinessService.GetCompanyVehicles(companyId);
            var mappedVehicles = _mapper.Map<IEnumerable<BusinessService.Models.Vehicle>, IEnumerable<Vehicle>>(vehicles);
            return mappedVehicles;
        }

        [Route("companies/{companyId}/vehicles/{vehicleId}")]
        [HttpGet]
        public async Task<Vehicle> GetVehicleById([FromUri] string companyId, [FromUri] string vehicleId)
        {
            var vehicle = await _vehicleBusinessService.GetVehicleById(new Guid(vehicleId));
            var mappedVehicle = _mapper.Map<BusinessService.Models.Vehicle, Vehicle>(vehicle);
            return mappedVehicle;
        }

        [Route("companies/{companyId}/drivers/{driverId}/vehicles")]
        [HttpPost]
        public async Task<IHttpActionResult> PostVehicle([FromUri] string companyId, [FromUri] string driverId, [FromBody] Vehicle Vehicle)
        {
            if (!ModelState.IsValid)
                return this.BadRequest(ModelState);

            var apiVehicle = _mapper.Map<Vehicle, BusinessService.Models.Vehicle>(Vehicle);
            var businessServiceVehicle = await _vehicleBusinessService.PostVehicle(new Guid(companyId),
                new Guid(driverId), apiVehicle);
            var mappedVehicle = _mapper.Map<BusinessService.Models.Vehicle, Vehicle>(businessServiceVehicle);
            return Ok(mappedVehicle);
        }
    }
}
