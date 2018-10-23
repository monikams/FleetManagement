using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApiService.Models;

namespace FleetManagement
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // CORS Requests Configurations
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new
                {
                    id = RouteParameter.Optional
                }
            );

            config.EnableDependencyInjection();

            ODataModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<Company>("companies");

            config.MapODataServiceRoute(
                 routeName: "ODataRoute",
                 routePrefix: "api",
                 model: builder.GetEdmModel());
            config.AddODataQueryFilter();

            config.Count().Filter().OrderBy().Expand().Select().MaxTop(null);
            config.EnsureInitialized();
        }
    }
}