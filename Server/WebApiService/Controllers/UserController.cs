namespace WebApiService.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;

    using AutoMapper;

    using BusinessService.Contracts;
    using BusinessService.Models;

    using WebApiService.Controllers.Base;

    [RoutePrefix("api")]
    public class UserController : BaseAuthorizationController
    {
        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        public UserController(IUserBusinessService userBusinessService)
            : base(userBusinessService)
        {
            this._config = new MapperConfiguration(cfg => { cfg.CreateMap<Models.User, User>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
        }

        [Route("users")]
        [HttpGet]
        public async Task<IEnumerable<Models.User>> GetAllUsers()
        {
            var allUsers = await this.UsersService.GetAllUsers(this.CurrentUser.Id);
            var mappedCompanies = this._mapper.Map<IEnumerable<User>, IEnumerable<Models.User>>(allUsers);

            return mappedCompanies;
        }

        [Route("users/{userId}")]
        [HttpGet]
        public async Task<Models.User> GetUserById()
        {
            var user = await this.UsersService.GetUser(this.CurrentUser.Id);
            var mappedUser = this._mapper.Map<User, Models.User>(user);

            return mappedUser;
        }
    }
}