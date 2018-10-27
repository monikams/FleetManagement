namespace WebApiService
{
    using System.Data.Entity;
    using System.Web.Http;

    using Data;
    using Data.Migrations;

    using Owin;

    public class WebApiStartup
    {
        public static void StartWebApi(IAppBuilder app)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<FleetManagementDbContext, Configuration>());

            var httpConfig = new HttpConfiguration();
            WebApiConfig.Register(httpConfig);

            httpConfig.EnsureInitialized();
        }
    }
}