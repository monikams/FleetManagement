using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using Moq;
using Xunit;
using DataAccessService.Models;
using DataAccessService.Service;
using Service = Data.Models.Service;


using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using Xunit;


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
           
            //con.CallBase = true;
            //con.Setup(c => c.IssuePins).Returns(MockDbSet<EntityModel.IssuePin>(TestData.IssuePins.ToList()).Object);

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
            //mockSet.As<IDbAsyncEnumerable<T>>()
            //    .Setup(m => m.GetAsyncEnumerator())
            //    .Returns(new FakeDbAsyncEnumerator<T>(queryable.GetEnumerator()));
            mockSet.As<IQueryable>().Setup(m => m.Expression).Returns(queryable.Expression);
            mockSet.As<IQueryable>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            //mockSet.As<IQueryable<T>>()
            // .Setup(m => m.Provider)
            // .Returns(new FakeDbAsyncQueryProvider<T>(queryable.Provider));
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
                //mockSet.Setup(x => x.FirstOrDefaultAsync(It.IsAny<object[]>())).ReturnsAsync(TestData.Services.ToList().FirstOrDefault());
            }
          
            return mockSet;
        }

        ///// <summary>
        ///// Tests that GetById method returns correct service by id
        ///// </summary>
        //[Fact()]
        //public void GetByIdTest()
        //{
        //    // Arrange
        //    var serviceId = TestData.Services[0].Id;
        //    ServiceDataAccessService es = new ServiceDataAccessService(_context.Object);

        //    // Act
        //    var results = es.GetById(serviceId);

        //    // Assert
        //    Assert.NotNull(results);
        //}

        ///// <summary>
        ///// Tests DeleteService method
        ///// </summary>
        //[Fact()]
        //public void DeleteServiceTest()
        //{
        //    // Arrange
        //    var serviceId = TestData.Services[0].Id;
        //    ServiceDataAccessService es = new ServiceDataAccessService(_context.Object);

        //    // Act
        //    var results = es.DeleteService(serviceId);

        //    // Assert
        //    Assert.NotNull(results);
        //}

        ///// <summary>
        ///// Tests that GetByVehicleId method returns correct services per vehicle
        ///// </summary>
        //[Fact()]
        //public void GetByVehicleIdTest()
        //{
        //    // Arrange
        //    var vehicleId = TestData.Vehicles[0].Id;
        //    var filterByOverdue = false;
        //    ServiceDataAccessService es = new ServiceDataAccessService(_context.Object);

        //    // Act
        //    var results = es.GetByVehicleId(vehicleId, filterByOverdue);

        //    // Assert
        //    Assert.NotNull(results);
        //}

        /////// <summary>
        /////// Tests PostService method     
        /////// </summary>
        //[Fact()]
        //public async Task PostServiceTest()
        //{
        //    // Arrange
        //    var vehicleId = TestData.Vehicles[0].Id;
        //    ServiceDataAccessService es = new ServiceDataAccessService(_context.Object);

        //    var newService = new PostService
        //    {
        //        BasedOn = 0,
        //        Description = "",
        //        MileageReminder = 0,
        //        MileageRule = 0,
        //        Name = "Car Wash",
        //        Recipient = "monikaspasova1@gmail.com",
        //        TimeReminder = 2,
        //        TimeReminderEntity = 1,
        //        TimeRule = 1,
        //        TimeRuleEntity = 2,
        //        VehicleId = vehicleId
        //    };

        //    // Act
        //    var result = await es.PostService(newService);

        //    // Assert
        //    Assert.NotNull(result);
        //    Assert.Equal(TestData.Services.Count() + 1, _context.Object.Services.Count());
        // //   _context.Verify(c => c.SaveChangesAsync());
        //}

    }
}
