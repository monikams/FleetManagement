namespace DataAccessService.Service
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

    public interface IDriverDataAccessService
    {
        Task<IEnumerable<Driver>> GetCompanyDrivers(string companyId);

        Task<Driver> GetDriverById(string driverId);

        Task<Driver> PostDriver(string companyId, Driver driver);
    }

    public interface IUserDataAccessService
    {
        User ByUsername(string username);
    }

    public interface ICompanyDataAccessService
    {
        Task<IEnumerable<Company>> GetAll();

        Task<Company> GetById(string companyId);

        Task<Company> PostItem(Company company);
    }
}