using DataAccessService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessService
{
    public interface IDataAccessService
    {
        IQueryable<Company> GetCompanies();
    }
}
