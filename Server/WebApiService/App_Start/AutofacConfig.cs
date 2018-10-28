namespace WebApiService
{
    using System.Data.Entity;
    using System.Reflection;
    using System.Web;
    using System.Web.Http;

    using Autofac;
    using Autofac.Integration.WebApi;

    using BusinessService.Service;

    using Data;

    using DataAccessService.Service;

    using Microsoft.Owin.Security;

    public static class AutofacConfig
    {
        public static void RegisterAutofac()
        {
            var builder = new ContainerBuilder();

            // Get your HttpConfiguration.
            var config = GlobalConfiguration.Configuration;

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // OPTIONAL: Register the Autofac filter provider.
            builder.RegisterWebApiFilterProvider(config);

            // OPTIONAL: Register the Autofac model binder provider.
            builder.RegisterWebApiModelBinderProvider();

            RegisterServices(builder);

            // Set the dependency resolver to be Autofac.
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static void RegisterServices(ContainerBuilder builder)
        {
            // Configure the db context, user manager and signin manager to use a single instance per request
            builder.RegisterType<FleetManagementDbContext>().AsSelf().InstancePerRequest();
            builder.Register(c => c.Resolve<FleetManagementDbContext>()).As<DbContext>().InstancePerRequest();
            builder.Register(c => HttpContext.Current.GetOwinContext().Authentication).As<IAuthenticationManager>();

            builder.RegisterType<VehicleBusinessService>().As<IVehicleBusinessService>();
            builder.RegisterType<VehicleDataAccessService>().As<IVehicleDataAccessService>();

            builder.RegisterType<DriverBusinessService>().As<IDriverBusinessService>();
            builder.RegisterType<DriverDataAccessService>().As<IDriverDataAccessService>();

            builder.RegisterType<UserDataAccessService>().As<IUserDataAccessService>();
            builder.RegisterType<UserBusinessService>().As<IUserBusinessService>();

            builder.RegisterType<CompanyBusinessService>().As<IBusinessService<BusinessService.Models.Company, string>>();
            builder.RegisterType<CompanyDataAccessService>().As<IDataAccessService<DataAccessService.Models.Company, string>> ();
        }
    }
}