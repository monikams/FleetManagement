namespace DataAccessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccessService.Models;

    public interface ICompanyDataAccessService
    {
        Task<IEnumerable<Company>> GetAll();

        Task<Company> GetById(string companyId);

        Task<Company> PostItem(Company company);

        Task<IEnumerable<Company>> GetByUserId(string userId);

        Task DeleteItem(string companyId);
    }
}