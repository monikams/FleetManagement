namespace WebApiService.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;

    using AutoMapper;

    using BusinessService.Models;
    using BusinessService.Service;

    using WebApiService.Controllers.Base;

    [RoutePrefix("api")]
    public class CompanyController : BaseAuthorizationController
    {
        private readonly ICompanyBusinessService _companyBusinessService;
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public CompanyController(ICompanyBusinessService companyBusinessService, IUserBusinessService userBusinessService)
            : base(userBusinessService)
        {
            _companyBusinessService = companyBusinessService;
            _config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Models.Company, BusinessService.Models.Company>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        [Route("companies")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<Models.Company>> GetCompanies()
        {
            var companies = await _companyBusinessService.GetAll();
            var mappedCompanies = _mapper.Map<IEnumerable<BusinessService.Models.Company>, IEnumerable<Models.Company>>(companies);
            return mappedCompanies;
        }

        [Route("companies/{companyId}")]
        [HttpGet]
        public async Task<Models.Company> GetCompanyById([FromUri] string companyId)
        {
            var company = await _companyBusinessService.GetById(companyId);
            var mappedCompany = _mapper.Map<BusinessService.Models.Company, Models.Company>(company);
            return mappedCompany;
        }

        [Route("companies")]
        [HttpPost]
        public async Task<IHttpActionResult> PostCompany([FromBody]Models.Company company, IEnumerable<string> subscribers)
        {
            if (!ModelState.IsValid)
                return this.BadRequest(ModelState);

            var apiCompany = _mapper.Map<Models.Company, BusinessService.Models.Company>(company);
            var businessServiceCompany = await _companyBusinessService.PostItem(apiCompany);
            var mappedCompany = _mapper.Map<BusinessService.Models.Company, Company>(businessServiceCompany);
            return Ok(mappedCompany);
        }

    }
}
