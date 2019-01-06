using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper;
using Data;
using DataAccessService.Contracts;
using DataAccessService.Models;

namespace DataAccessService.Service
{
    public class TelematicsHistoryDataAcessService : ITelematicsHistoryDataAccessService
    {
        private readonly MapperConfiguration _config;

        private readonly FleetManagementDbContext _context = new FleetManagementDbContext();

        private readonly IMapper _mapper;

        public TelematicsHistoryDataAcessService()
        {
        }

        public TelematicsHistoryDataAcessService(FleetManagementDbContext context)
        {
            _context = context;
            _config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Models.TelematicsDataHistory, Data.Models.TelematicsDataHistory>().ReverseMap();         
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IEnumerable<TelematicsDataHistory>> GetByVehicleVIN(string vehicleVIN)
        {
            var telematicsDataHistory = _context.TelematicsDataHistories.Where(td => td.VIN == vehicleVIN).ToList();
            var mappedTelematicsDataHistory = _mapper.Map<IEnumerable<Data.Models.TelematicsDataHistory>, IEnumerable<Models.TelematicsDataHistory>>(telematicsDataHistory);
            return await Task.Run(() => mappedTelematicsDataHistory);

        }
    }
}
