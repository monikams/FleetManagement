namespace DataAccessService.Service
{
    using System.Data.Entity;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Data;

    using DataAccessService.Models;

    public class UserDataAccessService : IUserDataAccessService
    {
        private readonly MapperConfiguration _config;

        private readonly FleetManagementDbContext _context = new FleetManagementDbContext();

        private readonly IMapper _mapper;

        public UserDataAccessService()
        {
        }

        public UserDataAccessService(FleetManagementDbContext context)
        {
            this._context = context;
            this._config = new MapperConfiguration(cfg => { cfg.CreateMap<User, Data.Models.User>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
        }

        public async Task<User> ByUsername(string username)
        {
            var user = await this._context.Users.Where(u => u.UserName == username).FirstOrDefaultAsync();
            var mappedUser = this._mapper.Map<Data.Models.User, User>(user);

            return await Task.Run(() => mappedUser);
        }
    }
}