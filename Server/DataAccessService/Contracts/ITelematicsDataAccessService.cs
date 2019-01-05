using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessService.Models;

namespace DataAccessService.Contracts
{
    public interface ITelematicsDataAccessService
    {
        Task<IEnumerable<TelematicsData>> GetByVehicleVIN(string vehicleVIN);
    }
}
