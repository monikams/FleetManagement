using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessService.Models;

namespace BusinessService.Contracts
{
    public interface ITelematicsHistoryBusinessService
    {
        Task<IEnumerable<TelematicsDataHistory>> GetTelematicsHistoryData(string vehicleVIN, string period);

        Task<double> GetTelematicsDataHistoryAverageSpeed(string vehicleVIN, string period);
    }
}
