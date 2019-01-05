using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper;
using BusinessService.Contracts;
using WebApiService.Controllers.Base;
using WebApiService.Models;

namespace WebApiService.Controllers
{
    [RoutePrefix("api")]
    public class TelematicsDataController : BaseAuthorizationController
    {
        private readonly ITelematicsBusinessService _telematicsBusinessService;
        private readonly IVehicleBusinessService _vehicleBusinessService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public TelematicsDataController(ITelematicsBusinessService telematicsBusinessService, IVehicleBusinessService vehicleBusinessService, IUserBusinessService userBusinessService)
        : base(userBusinessService)
        {
            _telematicsBusinessService = telematicsBusinessService;
            _vehicleBusinessService = vehicleBusinessService;
            _config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<TelematicsData, BusinessService.Models.TelematicsData>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        [Route("vehicles/{vehicleId}/telematicsData")]
        [HttpGet]
        public async Task<IEnumerable<TelematicsData>> GetTelematicsData([FromUri] string vehicleId)
        {
            var vehicle = await _vehicleBusinessService.GetVehicleById(vehicleId);
            if (vehicle == null)
            {
                return null;
            }

            var telematicsDatas = await _telematicsBusinessService.GetByVehicleVIN(vehicle.VIN);
            var mappedTelematicsDatas = _mapper.Map<IEnumerable<BusinessService.Models.TelematicsData>, IEnumerable<TelematicsData>>(telematicsDatas);
            return mappedTelematicsDatas;
        }
    }
}
