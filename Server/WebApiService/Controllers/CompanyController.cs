namespace WebApiService.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;

    using AutoMapper;

    using BusinessService.Contracts;

    using WebApiService.Controllers.Base;
    using WebApiService.Models;

    [RoutePrefix("api")]
    public class CompanyController : BaseAuthorizationController
    {
        private readonly ICompanyBusinessService _companyBusinessService;

        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        public CompanyController(
            ICompanyBusinessService companyBusinessService,
            IUserBusinessService userBusinessService)
            : base(userBusinessService)
        {
            this._companyBusinessService = companyBusinessService;
            this._config = new MapperConfiguration(
                cfg => { cfg.CreateMap<Company, BusinessService.Models.Company>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
        }

        [Route("companies")]
        [HttpGet]
        public async Task<IEnumerable<Company>> GetCompanies()
        {
            var companies = await this._companyBusinessService.GetAll();
            var mappedCompanies =
                this._mapper.Map<IEnumerable<BusinessService.Models.Company>, IEnumerable<Company>>(companies);
            return mappedCompanies;
        }

        [Route("companies/{companyId}")]
        [HttpGet]
        public async Task<Company> GetCompanyById([FromUri] string companyId)
        {
            var company = await this._companyBusinessService.GetById(companyId);
            var mappedCompany = this._mapper.Map<BusinessService.Models.Company, Company>(company);
            return mappedCompany;
        }

        [Route("companies")]
        [HttpPost]
        public async Task<IHttpActionResult> PostCompany([FromBody] Company company)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            company.CreatorId = this.CurrentUser.Id;
            var apiCompany = this._mapper.Map<Company, BusinessService.Models.Company>(company);
            var businessServiceCompany = await this._companyBusinessService.PostItem(apiCompany);
            var mappedCompany = this._mapper.Map<BusinessService.Models.Company, Company>(businessServiceCompany);
            return this.Ok(mappedCompany);
        }

        [Route("userCompanies/{userId}")]
        [HttpGet]
        public async Task<IEnumerable<Company>> GetUserCompanies([FromUri] string userId)
        {
            var companies = await this._companyBusinessService.GetByUserId(userId);
            var mappedCompanies =
                this._mapper.Map<IEnumerable<BusinessService.Models.Company>, IEnumerable<Company>>(companies);
            return mappedCompanies;
        }

        [Route("deleteCompany")]
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteCompany([FromUri] string companyId)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var company = await this._companyBusinessService.GetById(companyId);
            if (company == null || company.CreatorId != this.CurrentUser.Id)
            {
                return this.BadRequest();
            }

            await this._companyBusinessService.DeleteItem(companyId);
            return this.Ok();
        }
    }
}