namespace WebApiService.Controllers.Base
{
    using Data.Models;

    public class BaseAuthorizationController : BaseController
    {
        public BaseAuthorizationController()
        {
        }

        protected User CurrentUser { get; private set; }
    }
}