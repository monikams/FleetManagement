namespace BusinessService.Service
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

    public interface IDriverBusinessService
    {
        Task<IEnumerable<Driver>> GetCompanyDrivers(string companyId);

        Task<Driver> GetDriverById(string driverId);

        Task<Driver> PostDriver(string companyId, Driver driver);
    }

    public interface IUserBusinessService
    {
        User ByUsername(string username);
    }

    public interface ICompanyBusinessService
    {
        Task<IEnumerable<Company>> GetAll();

        Task<Company> GetById(string companyId);

        Task<Company> PostItem(Company company);
    }
}