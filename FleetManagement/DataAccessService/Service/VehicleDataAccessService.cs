using AutoMapper;
using DataAccessService.Models;
using EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace DataAccessService.Service
{
    public class VehicleDataAccessService : IVehicleDataAccessService<Models.Vehicle, Guid>
    {
        private readonly FleetManagementContext _context = new FleetManagementContext();
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;

        public VehicleDataAccessService(FleetManagementContext context)
        {
            _context = context;
            _config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Models.Vehicle, EntityModel.Vehicle>().ReverseMap();
            });
            _mapper = new Mapper(_config);
        }

        public async Task<IQueryable<Models.Vehicle>> GetCompanyVehicles(Guid companyId)
        {
            var vehicles = _context.Vehicles.Where(v => v.Id == companyId);

            var mappedVehicles = _mapper.Map<IEnumerable<EntityModel.Vehicle>, IEnumerable<Models.Vehicle>>(vehicles);

            return await Task.Run(() => mappedVehicles.AsQueryable());
        }

        public async Task<Models.Vehicle> GetVehicleById(Guid companyId, Guid vehicleId)
        {
            var vehicle =  _context.Vehicles.FirstOrDefault(v => v.Id == vehicleId && v.Company.Id == companyId);

            var mappedVehicle = _mapper.Map<EntityModel.Vehicle, Models.Vehicle>(vehicle);

            return await Task.Run(() => mappedVehicle);
        }

        //public async Task<Models.Company> PostItem(Models.Company company)
        //{
        //    var newCompany = new EntityModel.Company
        //    {
        //        Name = company.Name,
        //        Address = company.Address,
        //        Bulstat = company.Bulstat,
        //        Email = company.Email,
        //        Telephone = company.Telephone,
        //    };

        //    var addedCompany = _context.Companies.Add(newCompany);
        //    var mappedCompany = _mapper.Map<EntityModel.Company, Models.Company>(addedCompany);
        //    return await Task.Run(() => mappedCompany);
        //}
    }
}
