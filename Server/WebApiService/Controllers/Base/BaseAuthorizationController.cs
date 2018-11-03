namespace WebApiService.Controllers.Base
{
    using System.Net.Http;
    using System.Web.Http;

    using AutoMapper;

    using BusinessService.Service;

    using Microsoft.AspNet.Identity;
    using Microsoft.Owin.Security;

    using WebApiService.Models;

    [Authorize]
    public class BaseAuthorizationController : BaseController
    {
        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        public BaseAuthorizationController()
        {
        }

        public BaseAuthorizationController(IUserBusinessService userBusinessService)
        {
            this._config = new MapperConfiguration(
                cfg => { cfg.CreateMap<User, BusinessService.Models.User>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
            this.UsersService = userBusinessService;
            this.SetCurrentUser();
        }

        protected IUserBusinessService UsersService { get; }

        protected IAuthenticationManager Authentication
        {
            get
            {
                return this.Request?.GetOwinContext()?.Authentication;
            }
        }

        protected User CurrentUser { get; private set; }

        private void SetCurrentUser()
        {
            if (this.Authentication == null)
            {
                return;
            }

            var username = this.Authentication.User.Identity.Name;
            if (string.IsNullOrWhiteSpace(username))
            {
                return;
            }

            var user = this.UsersService.ByUsername(username);
            if (user == null)
            {
                return;
            }

            this.CurrentUser = this._mapper.Map<BusinessService.Models.User, User>(user);
        }

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return this.InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        this.ModelState.AddModelError("", error);
                    }
                }

                if (this.ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return this.BadRequest();
                }

                return this.BadRequest(this.ModelState);
            }

            return null;
        }
    }
}