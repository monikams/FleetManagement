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
        Task<IQueryable<T>> GetAll();

        Task<T> PostItem(T item);

        Task<T> GetById(Key item);
    }

    public interface IVehicleBusinessService
    {
        Task<IQueryable<Models.Vehicle>> GetCompanyVehicles(Guid companyId);
        Task<Models.Vehicle> GetVehicleById(Guid companyId, Guid vehicleId);
        Task<Vehicle> PostVehicle(Guid companyId, Vehicle Vehicle);
    }
}
