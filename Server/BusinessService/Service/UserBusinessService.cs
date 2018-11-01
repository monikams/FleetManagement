﻿namespace BusinessService.Service
{
    using System.Threading.Tasks;

    using AutoMapper;

    using BusinessService.Models;

    using DataAccessService.Service;

    public class UserBusinessService : IUserBusinessService
    {
        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;

        private readonly IUserDataAccessService _userDataAccessService;

        public UserBusinessService(IUserDataAccessService userDataAccessService)
        {
            this._userDataAccessService = userDataAccessService;
            this._config = new MapperConfiguration(
                cfg => { cfg.CreateMap<User, DataAccessService.Models.User>().ReverseMap(); });
            this._mapper = new Mapper(this._config);
        }

        public User ByUsername(string username)
        {
            var user = this._userDataAccessService.ByUsername(username);
            var mappedUser = this._mapper.Map<DataAccessService.Models.User, User>(user);

            return mappedUser;
        }
    }
}