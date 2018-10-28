using BusinessService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessService.Service
{
    public interface IBusinessService<T, Key> where T : class
    {
        Task<IEnumerable<T>> GetAll();

        Task<T> PostItem(T item);

        Task<T> GetById(Key item);
    }

    public interface IVehicleBusinessService
    {
        Task<IEnumerable<Models.Vehicle>> GetCompanyVehicles(string companyId);
        Task<Models.Vehicle> GetVehicleById(string vehicleId);
        Task<Vehicle> PostVehicle(string companyId, string driverId, Vehicle Vehicle);
    }

    public interface IDriverBusinessService
    {
        Task<IEnumerable<Models.Driver>> GetCompanyDrivers(string companyId);

        Task<Models.Driver> GetDriverById(string driverId);

        Task<Models.Driver> PostDriver(string companyId, Driver driver);
    }

    public interface IUserBusinessService
    {
        Task<User> ByUsername(string username);
    }
}
