namespace BusinessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BusinessService.Models;

    public interface IDriverBusinessService
    {
        Task<IEnumerable<Driver>> GetCompanyDrivers(string companyId);

        Task<Driver> GetDriverById(string driverId);

        Task<Driver> PostDriver(string companyId, Driver driver);
    }
}