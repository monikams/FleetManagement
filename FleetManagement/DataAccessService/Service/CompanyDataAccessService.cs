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
    public class CompanyDataAccessService : IDataAccessService<Models.Company, Guid>
    {
        private readonly FleetManagementContext _context = new FleetManagementContext();
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public CompanyDataAccessService(FleetManagementContext context)
        {
            _context = context;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Models.Company, EntityModel.Company>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IQueryable<Models.Company>> GetAll()
        {
            var companies =  _context.Companies;

            var mappedCompanies = _mapper.Map<IEnumerable<EntityModel.Company>, IEnumerable<Models.Company>>(companies);

            return await Task.Run(() => mappedCompanies.AsQueryable());
        }

        public async Task<Models.Company> GetById(Guid companyId)
        {
            var company = await _context.Companies.FindAsync(companyId);

            var mappedCompany = _mapper.Map<EntityModel.Company, Models.Company>(company);

            return await Task.Run(() => mappedCompany);
        }

        public async Task<Models.Company> PostItem(Models.Company company)
        {
            var newCompany = new EntityModel.Company
            {
                Name = company.Name,
                Address = company.Address,
                Bulstat = company.Bulstat,
                Email = company.Email,
                Telephone = company.Telephone,
            };

            var addedCompany = _context.Companies.Add(newCompany);
            var mappedCompany = _mapper.Map<EntityModel.Company, Models.Company>(addedCompany);
            return await Task.Run(() => mappedCompany);
        }
    }
}
