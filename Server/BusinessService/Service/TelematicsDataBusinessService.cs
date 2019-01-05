using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BusinessService.Contracts;
using BusinessService.Models;
using DataAccessService.Contracts;

namespace BusinessService.Service
{
    public class TelematicsDataBusinessService : ITelematicsBusinessService
    {
        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        private readonly ITelematicsDataAccessService _telematicsDataAccessService;

        public TelematicsDataBusinessService()
        {
        }

        public TelematicsDataBusinessService(ITelematicsDataAccessService telematicsDataAccessService)
        {
            this._telematicsDataAccessService = telematicsDataAccessService;
            this._config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<TelematicsData, DataAccessService.Models.TelematicsData>().ReverseMap();
                });
            this._mapper = new Mapper(this._config);
        }

        public async Task<IEnumerable<TelematicsData>> GetByVehicleVIN(string vehicleVIN)
        {
            var telematicsDatas = await this._telematicsDataAccessService.GetByVehicleVIN(vehicleVIN);
            var mappedTelematicsDatas =
                this._mapper.Map<IEnumerable<DataAccessService.Models.TelematicsData>, IEnumerable<TelematicsData>>(telematicsDatas);
            return mappedTelematicsDatas;         
        }
    }
}
