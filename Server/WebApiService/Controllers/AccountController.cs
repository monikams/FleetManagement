namespace WebApiService.Controllers
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;

    using BusinessService.Service;

    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.Owin;
    using Microsoft.Owin.Security.Cookies;

    using WebApiService.Controllers.Base;
    using WebApiService.Models;

    using User = Data.Models.User;

    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : BaseAuthorizationController
    {
        private const string LocalLoginProvider = "Local";

        private ApplicationUserManager _userManager;

        public AccountController(ApplicationUserManager userManager, IUserBusinessService userBusinessService)
            : base(userBusinessService)
        {
            this.UserManager = userManager;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return this._userManager ?? this.Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                this._userManager = value;
            }
        }

        // POST api/Account/Logout
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            this.Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return this.Ok();
        }

        // POST api/Account/ChangePassword
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            IdentityResult result = await this.UserManager.ChangePasswordAsync(
                                        this.User.Identity.GetUserId(),
                                        model.OldPassword,
                                        model.NewPassword);

            return !result.Succeeded ? this.GetErrorResult(result) : this.Ok();
        }

        // POST api/Account/RemoveLogin
        [Route("RemoveLogin")]
        public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            IdentityResult result;

            if (model.LoginProvider == LocalLoginProvider)
            {
                result = await this.UserManager.RemovePasswordAsync(this.User.Identity.GetUserId());
            }
            else
            {
                result = await this.UserManager.RemoveLoginAsync(
                             this.User.Identity.GetUserId(),
                             new UserLoginInfo(model.LoginProvider, model.ProviderKey));
            }

            return !result.Succeeded ? this.GetErrorResult(result) : this.Ok();
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var user = new User { UserName = model.Username, Email = model.Email };
            IdentityResult result = await this.UserManager.CreateAsync(user, model.Password);

            return !result.Succeeded ? this.GetErrorResult(result) : this.Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && this._userManager != null)
            {
                this._userManager.Dispose();
                this._userManager = null;
            }

            base.Dispose(disposing);
        }
    }
}