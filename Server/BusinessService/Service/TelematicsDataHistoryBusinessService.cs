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
    public class TelematicsDataHistoryBusinessService : ITelematicsHistoryBusinessService
    {
        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        private readonly ITelematicsHistoryDataAccessService _telematicsHistoryDataAccessService;

        public TelematicsDataHistoryBusinessService()
        {
        }

        public TelematicsDataHistoryBusinessService(ITelematicsHistoryDataAccessService telematicsHistoryDataAccessService)
        {
            this._telematicsHistoryDataAccessService = telematicsHistoryDataAccessService;
            this._config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<TelematicsDataHistory, DataAccessService.Models.TelematicsDataHistory>().ReverseMap();
                });
            this._mapper = new Mapper(this._config);
        }

        public async Task<IEnumerable<TelematicsDataHistory>> GetTelematicsHistoryData(string vehicleVIN, string period)
        {
            var telematicsDataHistory = await this._telematicsHistoryDataAccessService.GetTelematicsHistoryData(vehicleVIN, period);
            var mappedTelematicsDataHistory =
                this._mapper.Map<IEnumerable<DataAccessService.Models.TelematicsDataHistory>, IEnumerable<TelematicsDataHistory>>(telematicsDataHistory);
            return mappedTelematicsDataHistory;         
        }
    }
}
