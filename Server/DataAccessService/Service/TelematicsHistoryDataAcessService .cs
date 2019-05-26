using AutoMapper;
using Data;
using DataAccessService.Contracts;
using DataAccessService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public async Task<IEnumerable<TelematicsDataHistory>> GetTelematicsHistoryData(string vehicleVIN, string period)
        {
            var telematicsDataHistory = new List<Data.Models.TelematicsDataHistory>();
            if (period == "hour")
            {
                telematicsDataHistory = _context.TelematicsDataHistories
                        .ToList()
                        .Where(td => td.VIN == vehicleVIN && td.Modified > DateTimeOffset.Now.AddHours(-1))
                        .OrderBy(td => td.Modified)
                        .ToList();
            }
            else if (period == "day")
            {
                telematicsDataHistory = _context.TelematicsDataHistories
                    .ToList()
                    .Where(td => td.VIN == vehicleVIN && td.Modified > DateTimeOffset.Now.AddDays(-1))
                    .OrderBy(td => td.Modified)
                    .ToList();
            }
            else if (period == "week")
            {
                telematicsDataHistory = _context.TelematicsDataHistories
                    .ToList()
                    .Where(td => td.VIN == vehicleVIN && td.Modified > DateTimeOffset.Now.AddDays(-7))
                    .OrderBy(td => td.Modified)
                    .ToList();
            }
            else if (period == "month")
            {
                telematicsDataHistory = _context.TelematicsDataHistories
                    .ToList()
                    .Where(td => td.VIN == vehicleVIN && td.Modified > DateTimeOffset.Now.AddMonths(-1))
                    .OrderBy(td => td.Modified)
                    .ToList();
            }
            else if (period == "year")
            {
                telematicsDataHistory = _context.TelematicsDataHistories
                    .ToList()
                    .Where(td => td.VIN == vehicleVIN && td.Modified > DateTimeOffset.Now.AddYears(-1))
                    .OrderBy(td => td.Modified)
                    .ToList();
            }
            else if (period == "all")
            {
                telematicsDataHistory = _context.TelematicsDataHistories
                    .ToList()
                    .Where(td => td.VIN == vehicleVIN)
                    .OrderBy(td => td.Modified)
                    .ToList();
            }

            var mappedTelematicsDataHistory = _mapper.Map<IEnumerable<Data.Models.TelematicsDataHistory>, IEnumerable<Models.TelematicsDataHistory>>(telematicsDataHistory);
            return await Task.Run(() => mappedTelematicsDataHistory);
        }
    }
}
