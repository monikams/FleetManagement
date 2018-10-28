using Microsoft.Owin;

using WebApiService;

[assembly: OwinStartup(typeof(Startup))]

namespace WebApiService
{
    using Owin;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            this.ConfigureAuth(app);
            WebApiStartup.StartWebApi(app);
        }
    }
}