namespace WebApiService
{
    using System.Configuration;
    using System.Data.Entity;
    using System.Reflection;
    using System.Web.Http;

    using Autofac;
    using Autofac.Integration.WebApi;

    using Data;

    using FleetManagement;

    using Owin;

    using Configuration = Data.Migrations.Configuration;

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