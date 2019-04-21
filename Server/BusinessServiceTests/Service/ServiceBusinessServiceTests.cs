using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BusinessService.Contracts;
using BusinessService.Models;
using BusinessService.Service;
using DataAccessService.Contracts;
using Moq;
using Xunit;

namespace BusinessServiceTests
{
    [Trait("ServiceBusinessServiceTests", "Category")]
    public class ServiceBusinessServiceTests
    {
        private Mock<IServiceDataAccessService> _dataAccessService;

        private readonly MapperConfiguration _config;

        private readonly IMapper _mapper;
        
        public ServiceBusinessServiceTests()
        {
            _dataAccessService = new Mock<IServiceDataAccessService>();
            _config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Service, DataAccessService.Models.Service>().ReverseMap();
                    cfg.CreateMap<EditService, DataAccessService.Models.EditService>().ReverseMap();
                    cfg.CreateMap<PostService, DataAccessService.Models.PostService>().ReverseMap();
                });
            _mapper = new Mapper(_config);
        }

        public void AsserEqualServices(Service service, DataAccessService.Models.Service expected)
        {
            Assert.Equal(expected.Id, service.Id);
            Assert.Equal(expected.BasedOn, service.BasedOn);
            Assert.Equal(expected.Description, service.Description);
            Assert.Equal(expected.MileageReminder, service.MileageReminder);
            Assert.Equal(expected.MileageRule, service.MileageRule);
            Assert.Equal(expected.Name, service.Name);
            Assert.Equal(expected.NextServiceMileage, service.NextServiceMileage);
            Assert.Equal(expected.NextServiceReminderMileage, service.NextServiceReminderMileage);
            Assert.Equal(expected.NextServiceTime, service.NextServiceTime);
            Assert.Equal(expected.NextServiceReminderTime, service.NextServiceReminderTime);
            Assert.Equal(expected.Recipient, service.Recipient);
            Assert.Equal(expected.TimeReminder, service.TimeReminder);
            Assert.Equal(expected.TimeReminderEntity, service.TimeReminderEntity);
            Assert.Equal(expected.TimeRule, service.TimeRule);
            Assert.Equal(expected.TimeRuleEntity, service.TimeRuleEntity);
            Assert.Equal(expected.VehicleId, service.VehicleId);
        }

        public void AsserEqualServicesList(IEnumerable<Service> actual, DataAccessService.Models.Service expected)
        {
            foreach (var service in actual)
            {
                AsserEqualServices(service, expected);
            }
        }

        // <summary>
        /// Tests that GetByVehicleId method returns correct services per vehicle
        /// </summary>
        [Xunit.Fact()]
        public void GetByVehicleIdTest()
        {
            // Arrange
            var vehicleId = TestData.Vehicles[0].Id;
            var filterByOverdue = false;
            _dataAccessService.Setup(a => a.GetByVehicleId(vehicleId, filterByOverdue)).ReturnsAsync(TestData.Services.Where(s => s.VehicleId == vehicleId));
            IServiceBusinessService svc = new ServiceBusinessService(_dataAccessService.Object);

            // Act
            var actual = svc.GetByVehicleId(vehicleId, false);

            // Assert
            Xunit.Assert.NotEmpty(actual.Result);
            AsserEqualServicesList(actual.Result.ToList(), TestData.Services[0]);
        }

        // <summary>
        /// Tests that GetById method returns the correct service
        /// </summary>
        [Xunit.Fact()]
        public void GetByIdTest()
        {
            // Arrange
            var serviceId = TestData.Services[0].Id;
            _dataAccessService.Setup(a => a.GetById(serviceId)).ReturnsAsync(TestData.Services.FirstOrDefault(s => s.Id == serviceId));
            IServiceBusinessService svc = new ServiceBusinessService(_dataAccessService.Object);

            // Act
            var actual = svc.GetById(serviceId);

            // Assert
            Xunit.Assert.NotNull(actual.Result);
            AsserEqualServices(actual.Result, TestData.Services[0]);
        }

        // <summary>
        /// Tests that PostService method successfully posts a service
        /// </summary>
        [Xunit.Fact()]
        public void PostServiceTest()
        {
            // Arrange
            var serviceId = TestData.Services[0].Id;
            _dataAccessService.Setup(a => a.PostService(TestData.PostServices[0])).ReturnsAsync(TestData.Services[0]);
            IServiceBusinessService svc = new ServiceBusinessService(_dataAccessService.Object);
            var vehicle = new Vehicle
            {
                Id = Guid.NewGuid().ToString(),
                VIN = "3C6JR6AG8DG538799",
                PlateNumber = "136-SMTR",
                Type = "car",
                Brand = "Toyota",
            };
            var newService = new PostService
            {
                BasedOn = 0,
                Description = "",
                MileageReminder = 0,
                MileageRule = 0,
                Name = "Car Wash",
                Recipient = "monikaspasova1@gmail.com",
                TimeReminder = 2,
                TimeReminderEntity = 1,
                TimeRule = 1,
                TimeRuleEntity = 2,
                VehicleId = vehicle.Id
            };

            // Act         
            var actual = svc.PostService(newService);

            // Assert
            _dataAccessService.Verify(s => s.PostService(It.IsAny<DataAccessService.Models.PostService>()), Times.Once);
        }

        // <summary>
        /// Tests that EditService method successfully edits a service
        /// </summary>
        [Xunit.Fact()]
        public void EditServiceTest()
        {
            // Arrange
            _dataAccessService.Setup(a => a.EditService(TestData.EditServices[0])).ReturnsAsync(TestData.Services[0]);
            IServiceBusinessService svc = new ServiceBusinessService(_dataAccessService.Object);
            var editService = new EditService
            {
                BasedOn = 0,
                Description = "",
                MileageReminder = 0,
                MileageRule = 0,
                Name = "Car Wash",
                Recipient = "monikaspasova1@gmail.com",
                TimeReminder = 2,
                TimeReminderEntity = 1,
                TimeRule = 1,
                TimeRuleEntity = 2,
            };

            // Act          
            var actual = svc.EditService(editService);

            // Assert
            _dataAccessService.Verify(s => s.EditService(It.IsAny<DataAccessService.Models.EditService>()), Times.Once);
        }

        // <summary>
        /// Tests that DeleteService method successfully deletes a service
        /// </summary>
        //[Xunit.Fact()]
        //public void DeleteServiceTest()
        //{
        //    // Arrange
        //    var serviceId = TestData.Services[0].Id;
        //    _dataAccessService.Setup(a => a.DeleteService(serviceId)).ReturnsAsync((string s) => Task.FromResult());
        //    IServiceBusinessService svc = new ServiceBusinessService(_dataAccessService.Object);

        //    // Act
        //    var actual = svc.DeleteService(serviceId);

        //    // Assert
        //    _dataAccessService.Verify(s => s.DeleteService(serviceId), Times.Once);
        //}
    }
}
