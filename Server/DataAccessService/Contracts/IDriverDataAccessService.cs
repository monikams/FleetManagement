namespace DataAccessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccessService.Models;

    public interface IDriverDataAccessService
    {
        Task<IEnumerable<Driver>> GetCompanyDrivers(string companyId);

        Task<Driver> GetDriverById(string driverId);

        Task<Driver> PostDriver(string companyId, Driver driver);

        Task DeleteDriver(string driverId);

        Task<Driver> EditDriver(EditDriver driver);
    }
}