namespace BusinessService.Service
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;

    using BusinessService.Contracts;
    using BusinessService.Models;

    using DataAccessService.Contracts;
    using DataAccessService.Service;

    public class DriverBusinessService : IDriverBusinessService
    {
        private readonly IDriverDataAccessService _driverDataAccessService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public DriverBusinessService(IDriverDataAccessService driverDataAccessService)
        {
            _driverDataAccessService = driverDataAccessService;
            _config = new MapperConfiguration(cfg => 
                {
                    cfg.CreateMap<Company, DataAccessService.Models.Company>().ReverseMap();
                    cfg.CreateMap<Driver, DataAccessService.Models.Driver>().ReverseMap()
                       .ForMember(x => x.Company, b => b.ResolveUsing(c => c.Company)).ReverseMap();
                });
            _mapper = new Mapper(_config);
        }

        public async Task<IEnumerable<Driver>> GetCompanyDrivers(string companyId)
        {
            var drivers = await _driverDataAccessService.GetCompanyDrivers(companyId);
            var mappedDrivers = _mapper.Map<IEnumerable<DataAccessService.Models.Driver>, IEnumerable<Driver>>(drivers);
            return mappedDrivers;
        }

        public async Task<Models.Driver> GetDriverById(string driverId)
        {
            var driver = await _driverDataAccessService.GetDriverById(driverId);
            var mappedDriver = _mapper.Map<DataAccessService.Models.Driver, Driver>(driver);
            return mappedDriver;
        }

        public async Task<Driver> PostDriver(string companyId, Driver driver)
        {
            var dataAccessDriver = _mapper.Map<Driver, DataAccessService.Models.Driver>(driver);
            var businessServiceDriver = await _driverDataAccessService.PostDriver(companyId, dataAccessDriver);
            var mappedDriver = _mapper.Map<DataAccessService.Models.Driver, Driver>(businessServiceDriver);
            return mappedDriver;
        }
    }
}
