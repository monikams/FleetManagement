namespace DataAccessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccessService.Models;

    public interface IVehicleDataAccessService
    {
        Task<IEnumerable<Vehicle>> GetCompanyVehicles(string companyId);

        Task<Vehicle> GetVehicleById(string vehicleId);

        Task<Vehicle> PostVehicle(string companyId, string driverId, Vehicle vehicle);
    }
}