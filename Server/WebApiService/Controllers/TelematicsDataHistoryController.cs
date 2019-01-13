﻿using System;
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
    public class TelematicsDataHistoryController : BaseAuthorizationController
    {
        private readonly ITelematicsHistoryBusinessService _telematicsHistoryBusinessService;
        private readonly IVehicleBusinessService _vehicleBusinessService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public TelematicsDataHistoryController(ITelematicsHistoryBusinessService telematicsHistoryBusinessService, IVehicleBusinessService vehicleBusinessService, IUserBusinessService userBusinessService)
        : base(userBusinessService)
        {
            _telematicsHistoryBusinessService = telematicsHistoryBusinessService;
            _vehicleBusinessService = vehicleBusinessService;
            _config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<TelematicsDataHistory, BusinessService.Models.TelematicsDataHistory>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        [Route("vehicles/{vehicleId}/telematicsDataHistory")]
        [HttpGet]
        public async Task<IEnumerable<TelematicsDataHistory>> GetTelematicsDataHistory([FromUri] string vehicleId)
        {
            var vehicle = await _vehicleBusinessService.GetVehicleById(vehicleId);
            if (vehicle == null)
            {
                return null;
            }

            var telematicsDataHistories = await _telematicsHistoryBusinessService.GetByVehicleVIN(vehicle.VIN);
            var mappedTelematicsDataHistories = _mapper.Map<IEnumerable<BusinessService.Models.TelematicsDataHistory>, IEnumerable<TelematicsDataHistory>>(telematicsDataHistories);
            return mappedTelematicsDataHistories;
        }
    }
}