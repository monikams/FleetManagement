using DataAccessService.Models;

namespace DataAccessService.Service
{
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Data;
    using Data.Models;

    using DataAccessService.Contracts;

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
            var companies = this._context.Companies.ToList();
            var mappedCompanies = this._mapper.Map<IEnumerable<Data.Models.Company>, IEnumerable<Company>>(companies);

            return await Task.Run(() => mappedCompanies);
        }

        public async Task<Company> GetById(string companyId)
        {
            var company = await this._context.Companies.FindAsync(companyId);         
            var companyUsersIds = this._context.UserCompanies.Where(userCompany => userCompany.CompanyId == companyId).Select(uc => uc.UserId).ToList();
            IList<Models.User> companyUsers = new List<Models.User>();

            foreach (var userId in companyUsersIds)
            {
                var user = await this._context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
                if (user != null)
                {
                    var mappedUser = this._mapper.Map<User, Models.User>(user);
                    companyUsers.Add(mappedUser);
                }
            }
         
            var mappedCompany = this._mapper.Map<Data.Models.Company, Company>(company);
            mappedCompany.Subscribers = companyUsers;
            return await Task.Run(() => mappedCompany);
        }

        public async Task<Company> PostCompany(Company company)
        {
            var newCompany = new Data.Models.Company
            {
                Name = company.Name,
                Address = company.Address,
                Email = company.Email,
                Telephone = company.Telephone,
                CreatorId = company.CreatorId
            };
            var addedCompany = this._context.Companies.Add(newCompany);

            foreach (var subscriber in company.Subscribers)
            {
                if (subscriber != null)
                {
                    this._context.UserCompanies.Add(new UserCompany
                        {CompanyId = addedCompany.Id, UserId = subscriber.Id});
                }
            }

            await this._context.SaveChangesAsync();

            var mappedCompany = this._mapper.Map<Data.Models.Company, Company>(addedCompany);
            return await Task.Run(() => mappedCompany);
        }

        public async Task<IEnumerable<Company>> GetByUserId(string userId)
        {
            var companies = await this._context.Companies.Where(c => c.CreatorId == userId).ToListAsync();
            var subscriberCompanies = await this._context.UserCompanies.Where(x => x.UserId == userId).Select(u => u.Company).ToListAsync();

            companies.AddRange(subscriberCompanies);

            var mappedCompanies = this._mapper.Map<IEnumerable<Data.Models.Company>, IEnumerable<Company>>(companies);

            return await Task.Run(() => mappedCompanies);
        }

        public async Task DeleteItem(string companyId)
        {
            var company = this._context.Companies.FirstOrDefault(x => x.Id == companyId);
            if (company != null)
            {
                this._context.Companies.Remove(company);
                await this._context.SaveChangesAsync();
            }
        }

        public async Task<Company> EditCompany(EditCompany companyForEdit)
        {
            var company = await _context.Companies.FindAsync(companyForEdit.Id);
            company.Name = companyForEdit.Name;
            company.Address = companyForEdit.Address;
            company.Telephone = companyForEdit.Telephone ?? string.Empty;
            company.Email = companyForEdit.Email;

            var companySubscribers = this._context.UserCompanies.Where(u => u.CompanyId == company.Id).ToList();
            foreach (var companySubscriber in companySubscribers)
            {
                var subscriberRemain = companyForEdit.Subscribers.Any(x => x.Id == companySubscriber.UserId);
                if (!subscriberRemain)
                {
                    this._context.UserCompanies.Remove(companySubscriber);
                }
            }

            foreach (var subscriber in companyForEdit.Subscribers)
            {
                if (subscriber != null && !companySubscribers.Any(s => s.UserId == subscriber.Id))
                {
                    this._context.UserCompanies.Add(new UserCompany
                        { CompanyId = company.Id, UserId = subscriber.Id });
                }
            }

            await _context.SaveChangesAsync();
            return (Company) _mapper.Map(company, typeof(Data.Models.Company), typeof(Company));        
        }
    }
}