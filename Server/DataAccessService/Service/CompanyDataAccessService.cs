namespace DataAccessService.Service
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;

    using Data;
    using Data.Models;

    using Company = DataAccessService.Models.Company;

    public class CompanyDataAccessService : ICompanyDataAccessService
    {
        private readonly MapperConfiguration _config;

        private readonly FleetManagementDbContext _context = new FleetManagementDbContext();

        private readonly IMapper _mapper;

        public CompanyDataAccessService()
        {
        }

        public CompanyDataAccessService(FleetManagementDbContext context)
        {
            this._context = context;
            this._config =
                new MapperConfiguration(cfg => { cfg.CreateMap<Company, Data.Models.Company>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
        }

        public async Task<IEnumerable<Company>> GetAll()
        {
            var companies = this._context.Companies;

            var mappedCompanies = this._mapper.Map<IEnumerable<Data.Models.Company>, IEnumerable<Company>>(companies);

            return await Task.Run(() => mappedCompanies);
        }

        public async Task<Company> GetById(string companyId)
        {
            var company = await this._context.Companies.FindAsync(companyId);

            var mappedCompany = this._mapper.Map<Data.Models.Company, Company>(company);

            return await Task.Run(() => mappedCompany);
        }

        public async Task<Company> PostItem(Company company)
        {
            var newCompany = new Data.Models.Company
                                 {
                                     Name = company.Name,
                                     Address = company.Address,
                                     Bulstat = company.Bulstat,
                                     Email = company.Email,
                                     Telephone = company.Telephone,
                                     CreatorId = company.CreatorId
                                 };

            var addedCompany = this._context.Companies.Add(newCompany);

            foreach (var subscriberId in company.Subscribers)
            {
                this._context.UserCompanies.Add(
                    new UserCompany { CompanyId = addedCompany.Id, UserId = subscriberId });
            }

            this._context.SaveChanges();

            var mappedCompany = this._mapper.Map<Data.Models.Company, Company>(addedCompany);
            return await Task.Run(() => mappedCompany);
        }
    }
}