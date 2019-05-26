using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessService.Models;

namespace BusinessService.Contracts
{
    public interface ITelematicsHistoryBusinessService
    {
        Task<IEnumerable<TelematicsDataHistory>> GetByVehicleVIN(string vehicleVIN, string period);
    }
}
