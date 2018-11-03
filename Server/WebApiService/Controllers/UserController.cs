namespace WebApiService.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;

    using AutoMapper;

    using BusinessService.Service;

    using WebApiService.Controllers.Base;
    using WebApiService.Models;

    [RoutePrefix("api")]
    public class UserController : BaseAuthorizationController
    {
        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        public UserController(IUserBusinessService userBusinessService)
            : base(userBusinessService)
        {
            this._config = new MapperConfiguration(
                cfg => { cfg.CreateMap<User, BusinessService.Models.User>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
        }

        [Route("users")]
        [HttpGet]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var allUsers = await this.UsersService.GetAllUsers();
            var mappedCompanies =
                this._mapper.Map<IEnumerable<BusinessService.Models.User>, IEnumerable<User>>(allUsers);

            return mappedCompanies;
        }
    }
}