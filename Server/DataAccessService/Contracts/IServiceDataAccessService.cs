namespace DataAccessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccessService.Models;

    public interface IServiceDataAccessService
    {
        Task<Service> GetById(string id);

        Task<IEnumerable<Service>> GetByVehicleId(string vehicleId);

        Task<Service> PostService(Service service);
    }
}