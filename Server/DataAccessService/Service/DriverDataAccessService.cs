namespace DataAccessService.Service
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Data;

    using DataAccessService.Contracts;

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
                    cfg.CreateMap<Models.Company, Data.Models.Company>().ReverseMap();
                    cfg.CreateMap<Models.Driver, Data.Models.Driver>()
                       .ForMember(x => x.Company, b => b.ResolveUsing(c => c.Company)).ReverseMap();

                });
            _mapper = new Mapper(_config);
        }

        public async Task<IEnumerable<Models.Driver>> GetCompanyDrivers(string companyId)
        {
            var drivers = _context.Drivers.Where(d => d.CompanyId == companyId).ToList();
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
            await this._context.SaveChangesAsync();

            var mappedDriver = _mapper.Map<Data.Models.Driver, Models.Driver>(addedDriver);
            return await Task.Run(() => mappedDriver);
        }

        public async Task DeleteDriver(string driverId)
        {
            var driver = this._context.Drivers.FirstOrDefault(x => x.Id == driverId);
            if (driver != null)
            {
                this._context.Drivers.Remove(driver);
                await this._context.SaveChangesAsync();
            }
        }
    }
}
