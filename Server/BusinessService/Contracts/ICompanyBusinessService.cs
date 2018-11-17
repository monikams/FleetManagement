namespace BusinessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BusinessService.Models;

    public interface ICompanyBusinessService
    {
        Task<IEnumerable<Company>> GetAll();

        Task<Company> GetById(string companyId);

        Task<Company> PostItem(Company company);

        Task<IEnumerable<Company>> GetByUserId(string userId);

        Task DeleteItem(string companyId);
    }
}