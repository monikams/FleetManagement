namespace BusinessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BusinessService.Models;

    public interface IVehicleBusinessService
    {
        Task<IEnumerable<Vehicle>> GetCompanyVehicles(string companyId);

        Task<Vehicle> GetVehicleById(string vehicleId);

        Task<Vehicle> PostVehicle(string companyId, string driverId, Vehicle vehicle);
    }
}