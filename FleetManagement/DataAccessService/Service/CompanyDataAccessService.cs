using AutoMapper;
using Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DataAccessService.Service
{
    public class CompanyDataAccessService : IDataAccessService<Models.Company, string>
    {
        private readonly FleetManagementDbContext _context = new FleetManagementDbContext();
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public CompanyDataAccessService()
        {
        }

        public CompanyDataAccessService(FleetManagementDbContext context)
        {
            _context = context;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Models.Company, Data.Models.Company>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IQueryable<Models.Company>> GetAll()
        {
            var companies =  _context.Companies;

            var mappedCompanies = _mapper.Map<IEnumerable<Data.Models.Company>, IEnumerable<Models.Company>>(companies);

            return await Task.Run(() => mappedCompanies.AsQueryable());
        }

        public async Task<Models.Company> GetById(string companyId)
        {
            var company = await _context.Companies.FindAsync(companyId);

            var mappedCompany = _mapper.Map<Data.Models.Company, Models.Company>(company);

            return await Task.Run(() => mappedCompany);
        }

        public async Task<Models.Company> PostItem(Models.Company company)
        {
            var newCompany = new  Data.Models.Company
            {
                Name = company.Name,
                Address = company.Address,
                Bulstat = company.Bulstat,
                Email = company.Email,
                Telephone = company.Telephone,
            };

            var addedCompany = _context.Companies.Add(newCompany);
            var mappedCompany = _mapper.Map<Data.Models.Company, Models.Company>(addedCompany);
            return await Task.Run(() => mappedCompany);
        }
    }
}
