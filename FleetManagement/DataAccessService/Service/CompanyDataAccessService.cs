using DataAccessService.Models;
using EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace DataAccessService.Service
{
    public class CompanyDataAccessService : IDataAccessService
    {
        private readonly FleetManagementContext _context = new FleetManagementContext();

        public IQueryable<Models.Company> GetCompanies()
        {
            var a = _context.Companies;
            return null;
        }
    }
}
