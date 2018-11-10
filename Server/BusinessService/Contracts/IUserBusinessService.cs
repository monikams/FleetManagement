namespace BusinessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BusinessService.Models;

    public interface IUserBusinessService
    {
        User ByUsername(string username);

        Task<IEnumerable<User>> GetAllUsers();
    }
}