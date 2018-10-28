﻿namespace DataAccessService.Service
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

        public User ByUsername(string username)
        {
            var user = this._context.Users.FirstOrDefault(u => u.UserName == username);
            var mappedUser = this._mapper.Map<Data.Models.User, User>(user);

            return mappedUser;
        }
    }
}