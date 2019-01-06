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
    public class TelematicsDataAcessService : ITelematicsDataAccessService
    {
        private readonly MapperConfiguration _config;

        private readonly FleetManagementDbContext _context = new FleetManagementDbContext();

        private readonly IMapper _mapper;

        public TelematicsDataAcessService()
        {
        }

        public TelematicsDataAcessService(FleetManagementDbContext context)
        {
            _context = context;
            _config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Models.TelematicsData, Data.Models.TelematicsData>().ReverseMap();         
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IEnumerable<TelematicsData>> GetByVehicleVIN(string vehicleVIN)
        {
            var telematicsData = _context.TelematicsDatas.Where(td => td.VIN == vehicleVIN).ToList();
            var mappedTelematicsData = _mapper.Map<IEnumerable<Data.Models.TelematicsData>, IEnumerable<Models.TelematicsData>>(telematicsData);
            return await Task.Run(() => mappedTelematicsData);
        }
    }
}
