namespace DataAccessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccessService.Models;

    public interface IUserDataAccessService
    {
        User ByUsername(string username);

        Task<IEnumerable<User>> GetAllUsers(string currentUserId);

        Task<User> GetUser(string currentUserId);
    }
}