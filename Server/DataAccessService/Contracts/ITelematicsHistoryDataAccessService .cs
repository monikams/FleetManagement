using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessService.Models;

namespace DataAccessService.Contracts
{
    public interface ITelematicsHistoryDataAccessService
    {
        Task<IEnumerable<TelematicsDataHistory>> GetTelematicsHistoryData(string vehicleVIN, string period);
    }
}
