namespace BusinessService.Service
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;

    using BusinessService.Contracts;
    using BusinessService.Models;

    using DataAccessService.Contracts;
    using DataAccessService.Service;

    public class CompanyBusinessService : ICompanyBusinessService
    {
        private readonly ICompanyDataAccessService _companyDataAccessService;

        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        public CompanyBusinessService()
        {
        }

        public CompanyBusinessService(ICompanyDataAccessService companyDataAccessService)
        {
            this._companyDataAccessService = companyDataAccessService;
            this._config = new MapperConfiguration(
                cfg => { cfg.CreateMap<Company, DataAccessService.Models.Company>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
        }

        public async Task<IEnumerable<Company>> GetAll()
        {
            var companies = await this._companyDataAccessService.GetAll();
            var mappedCompanies =
                this._mapper.Map<IEnumerable<DataAccessService.Models.Company>, IEnumerable<Company>>(companies);
            return mappedCompanies;
        }

        public async Task<Company> GetById(string companyId)
        {
            var company = await this._companyDataAccessService.GetById(companyId);
            var mappedCompany = this._mapper.Map<DataAccessService.Models.Company, Company>(company);
            return mappedCompany;
        }

        public async Task<Company> PostItem(Company company)
        {
            var dataAccessCompany = this._mapper.Map<Company, DataAccessService.Models.Company>(company);
            var businessServiceCompany = await this._companyDataAccessService.PostItem(dataAccessCompany);
            var mappedCompany = this._mapper.Map<DataAccessService.Models.Company, Company>(businessServiceCompany);
            return mappedCompany;
        }

        public async Task<IEnumerable<Company>> GetByUserId(string userId)
        {
            var companies = await this._companyDataAccessService.GetByUserId(userId);
            var mappedCompanies =
                this._mapper.Map<IEnumerable<DataAccessService.Models.Company>, IEnumerable<Company>>(companies);
            return mappedCompanies;
        }

        public async Task DeleteItem(string companyId)
        {
            await this._companyDataAccessService.DeleteItem(companyId);
        }
    }
}