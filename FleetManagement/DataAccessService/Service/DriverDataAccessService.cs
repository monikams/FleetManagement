using AutoMapper;
using DataAccessService.Models;
using EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace DataAccessService.Service
{
    public class DriverDataAccessService : IDriverDataAccessService<Models.Driver, Guid>
    {
        private readonly FleetManagementContext _context = new FleetManagementContext();
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public DriverDataAccessService(FleetManagementContext context)
        {
            _context = context;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Models.Driver, EntityModel.Driver>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IQueryable<Models.Driver>> GetCompanyDrivers(Guid companyId)
        {
            var drivers = _context.Drivers.Where(d => d.Id == companyId);

            var mappedDrivers = _mapper.Map<IEnumerable<EntityModel.Driver>, IEnumerable<Models.Driver>>(drivers);

            return await Task.Run(() => mappedDrivers.AsQueryable());
        }

        public async Task<Models.Driver> GetDriverById(Guid driverId)
        {
            var driver = _context.Drivers.FirstOrDefault(v => v.Id == driverId);

            var mappedDriver = _mapper.Map<EntityModel.Driver, Models.Driver>(driver);

            return await Task.Run(() => mappedDriver);
        }

        public async Task<Models.Driver> PostDriver(Guid companyId, Models.Driver driver)
        {
            var company = await _context.Companies.FindAsync(companyId);
            var newDriver = new EntityModel.Driver
            {
                Name = driver.Name,
                Address = driver.Address,
                Telephone = driver.Telephone,
                Email = driver.Email,
                Company = company,                           
            };

            var addedDriver = _context.Drivers.Add(newDriver);
            var mappedDriver = _mapper.Map<EntityModel.Driver, Models.Driver>(addedDriver);
            return await Task.Run(() => mappedDriver);
        }
    }
}
