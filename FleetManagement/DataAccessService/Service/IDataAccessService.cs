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
        Task<IQueryable<T>> GetAll();

        Task<T> PostItem(T item);

        Task<T> GetById(Key item);
    }

    public interface IVehicleDataAccessService<Vehicle, Guid>
    {
        Task<IQueryable<Models.Vehicle>> GetCompanyVehicles(Guid companyId);

        Task<Models.Vehicle> GetVehicleById(Guid vehicleId);

        Task<Models.Vehicle> PostVehicle(Guid companyId, Guid driverId, Vehicle vehicle);
    }

    public interface IDriverDataAccessService<Driver, Guid>
    {
        Task<IQueryable<Models.Driver>> GetCompanyDrivers(Guid companyId);

        Task<Models.Driver> GetDriverById(Guid driverId);

        Task<Models.Driver> PostDriver(Guid companyId, Driver driver);
    }
}
