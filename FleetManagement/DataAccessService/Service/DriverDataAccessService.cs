using AutoMapper;
using Data;
using DataAccessService.Models;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace DataAccessService.Service
{
    public class DriverDataAccessService : IDriverDataAccessService
    {
        private readonly FleetManagementDbContext _context = new FleetManagementDbContext();
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public DriverDataAccessService()
        {
        }

        public DriverDataAccessService(FleetManagementDbContext context)
        {
            _context = context;
            _config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Models.Driver, Data.Models.Driver>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IEnumerable<Models.Driver>> GetCompanyDrivers(string companyId)
        {
            var drivers = _context.Drivers.Where(d => d.Id == companyId);

            var mappedDrivers = _mapper.Map<IEnumerable<Data.Models.Driver>, IEnumerable<Models.Driver>>(drivers);

            return await Task.Run(() => mappedDrivers);
        }

        public async Task<Models.Driver> GetDriverById(string driverId)
        {
            var driver = _context.Drivers.FirstOrDefault(v => v.Id == driverId);

            var mappedDriver = _mapper.Map<Data.Models.Driver, Models.Driver>(driver);

            return await Task.Run(() => mappedDriver);
        }

        public async Task<Models.Driver> PostDriver(string companyId, Models.Driver driver)
        {
            var company = await _context.Companies.FindAsync(companyId);
            var newDriver = new Data.Models.Driver
            {
                Name = driver.Name,
                Address = driver.Address,
                Telephone = driver.Telephone,
                Email = driver.Email,
                Company = company,
            };

            var addedDriver = _context.Drivers.Add(newDriver);
            var mappedDriver = _mapper.Map<Data.Models.Driver, Models.Driver>(addedDriver);
            return await Task.Run(() => mappedDriver);
        }
    }
}
