using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using Moq;
using DataAccessService.Models;
using Service = Data.Models.Service;
using System.Data.Entity;

namespace DataAccessServiceTests
{
    public class ServiceDataAccessServiceTests
    {
        Mock<FleetManagementDbContext> _context;
        private readonly MapperConfiguration _config;
        IMapper _mapper;
        public ServiceDataAccessServiceTests()
        {
            var con = new Mock<FleetManagementDbContext>();
            con.Setup(c => c.Services).Returns(MockDbSet<Service>(TestData.Services.ToList()).Object);                    

            _context = con;
            _config =
                new MapperConfiguration(
                    cfg =>
                    {
                        cfg.CreateMap<Service, Data.Models.Service>().ReverseMap();
                        cfg.CreateMap<Data.Models.Service, Service>().ReverseMap();
                        cfg.CreateMap<EditService, Data.Models.Service>().ReverseMap();
                        cfg.CreateMap<PostService, Data.Models.Service>().ReverseMap();
                    });
            _mapper = new Mapper(this._config);
        }

        private static Mock<DbSet<Data.Models.Service>> MockDbSet<Service>(List<Data.Models.Service> set)
        {
            var queryable = set.AsQueryable();
            var mockSet = new Mock<DbSet<Data.Models.Service>>();            
            mockSet.As<IQueryable>().Setup(m => m.Expression).Returns(queryable.Expression);
            mockSet.As<IQueryable>().Setup(m => m.ElementType).Returns(queryable.ElementType);         
            mockSet.As<IQueryable>().Setup(m => m.GetEnumerator()).Returns(queryable.GetEnumerator());
            mockSet.Setup(d => d.Add(It.IsAny<Data.Models.Service>())).Callback<Data.Models.Service>((s) => set.Add(s)).Returns<Data.Models.Service>(s => s);
            mockSet.Setup(d => d.AddRange(It.IsAny<IEnumerable<Data.Models.Service>>())).Returns((IEnumerable<Data.Models.Service> s) => s).Callback<IEnumerable<Data.Models.Service>>((s) => set.AddRange(s));
            mockSet.Setup(d => d.RemoveRange(It.IsAny<IEnumerable<Data.Models.Service>>())).Callback<IEnumerable<Data.Models.Service>>((s) =>
            {
                set.RemoveRange(0, s.Count());
            }).Returns<IEnumerable<Data.Models.Service>>(s => s);

            if (typeof(Data.Models.Service) == typeof(Service))
            {
                mockSet.Setup(x => x.Find(It.IsAny<object[]>())).Returns<object[]>(x => (set as List<Data.Models.Service>).FirstOrDefault(y => y.Id == x[0]));
                mockSet.Setup(x => x.FindAsync(It.IsAny<object[]>())).Returns<object[]>(x => Task.FromResult((set as List<Data.Models.Service>).FirstOrDefault(y => y.Id == x[0])));             
            }
          
            return mockSet;
        }
    }
}
