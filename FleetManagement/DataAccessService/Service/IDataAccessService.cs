using DataAccessService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessService.Service
{
    public interface IDataAccessService<T, Key> where T : class
    {
        Task<IEnumerable<T>> GetAll();

        Task<T> PostItem(T item);

        Task<T> GetById(Key item);
    }

    public interface IVehicleDataAccessService
    {
        Task<IEnumerable<Models.Vehicle>> GetCompanyVehicles(string companyId);

        Task<Models.Vehicle> GetVehicleById(string vehicleId);

        Task<Models.Vehicle> PostVehicle(string companyId, string driverId, Vehicle vehicle);
    }

    public interface IDriverDataAccessService
    {
        Task<IEnumerable<Models.Driver>> GetCompanyDrivers(string companyId);

        Task<Models.Driver> GetDriverById(string driverId);

        Task<Models.Driver> PostDriver(string companyId, Driver driver);
    }

    public interface IUserDataAccessService
    {
        Task<User> ByUsername(string username);
    }
}
