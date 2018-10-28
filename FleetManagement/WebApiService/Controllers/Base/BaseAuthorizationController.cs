namespace WebApiService.Controllers.Base
{
    using System.Web.Http;

    using AutoMapper;

    using BusinessService.Service;

    using WebApiService.Models;

    [Authorize]
    public class BaseAuthorizationController : BaseController
    {
        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        public BaseAuthorizationController(IUserBusinessService userBusinessService)
        {
            this._config = new MapperConfiguration(
                cfg => { cfg.CreateMap<User, BusinessService.Models.User>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
            this.UsersService = userBusinessService;
            this.SetCurrentUser();
        }
        
        protected IUserBusinessService UsersService { get; }

        protected User CurrentUser { get; private set; }

        private async void SetCurrentUser()
        {
            var username = this.User.Identity.Name;
            if (username == null)
            {
                return;
            }

            var user = await this.UsersService.ByUsername(username);
            if (user == null)
            {
                return;
            }

            this.CurrentUser = this._mapper.Map<BusinessService.Models.User, User>(user);
        }
    }
}