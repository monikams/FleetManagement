using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessService.Service;
using BusinessService.Models;
using AutoMapper;

namespace BusinessService.Service
{
    public class CompanyBusinessService : IBusinessService<Company,string>
    {
        private readonly IDataAccessService<DataAccessService.Models.Company, string> _companyDataAccessService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public CompanyBusinessService(IDataAccessService<DataAccessService.Models.Company, string> companyDataAccessService)
        {
            _companyDataAccessService = companyDataAccessService;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Company, DataAccessService.Models.Company>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IQueryable<Company>> GetAll()
        {
            var companies = await _companyDataAccessService.GetAll();
            var mappedCompanies = _mapper.Map<IQueryable<DataAccessService.Models.Company>, IQueryable<Company>>(companies);
            return mappedCompanies;
        }

        public async Task<Company> GetById(string companyId)
        {
            var company = await _companyDataAccessService.GetById(companyId);
            var mappedCompany = _mapper.Map<DataAccessService.Models.Company,Company>(company);
            return mappedCompany;
        }

        public async Task<Company> PostItem(Company company)
        {
            var dataAccessCompany = _mapper.Map<Company, DataAccessService.Models.Company>(company);
            var businessServiceCompany = await _companyDataAccessService.PostItem(dataAccessCompany);
            var mappedCompany = _mapper.Map<DataAccessService.Models.Company, Company>(businessServiceCompany);
            return mappedCompany;
        }

    }
}
