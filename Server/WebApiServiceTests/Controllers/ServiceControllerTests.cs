using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessService.Contracts;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WebApiService.Controllers;
using WebApiService.Models;


namespace WebApiServiceTests
{
    [TestClass]
    public class ServiceControllerTests
    {
        private IMapper _mapper;
        private Mock<IServiceBusinessService> _serviceBusinessService;
        private Mock<IVehicleBusinessService> _vehicleBusinessService;
        private Mock<IUserBusinessService> _userBusinessService;
        private readonly MapperConfiguration _config;

        public ServiceControllerTests()
        {
           _config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Service, BusinessService.Models.Service>().ReverseMap();
                    cfg.CreateMap<EditService, BusinessService.Models.EditService>().ReverseMap();
                });
            _mapper = new Mapper(this._config);
            _serviceBusinessService = new Mock<IServiceBusinessService>();
            _vehicleBusinessService = new Mock<IVehicleBusinessService>();
            _userBusinessService = new Mock<IUserBusinessService>();
        }

        private ServiceController ConfigureController()
        {
            ConfigurationManager.AppSettings.Set("defaultTimeZone", "Pacific Standard Time");

            _vehicleBusinessService.Setup(s => s.GetVehicleById(It.IsAny<string>()))
                .Returns((string vehicleId) => Task.FromResult(TestData.Vehicles.Where(s => s.Id == vehicleId).FirstOrDefault()));

            _serviceBusinessService.Setup(s => s.GetByVehicleId(It.IsAny<string>(), It.IsAny<bool>()))
                .Returns((string vehicleId, bool filterByOverdue) => Task.FromResult(TestData.Services.Where(s => s.VehicleId == vehicleId)));

            _serviceBusinessService.Setup(s => s.GetById(It.IsAny<string>()))
                .Returns((string serviceId) => Task.FromResult(TestData.Services.Where(s => s.Id == serviceId).FirstOrDefault()));

            _serviceBusinessService.Setup(a => a.PostService(TestData.PostServices[0])).ReturnsAsync(TestData.Services[0]);
            _serviceBusinessService.Setup(a => a.EditService(TestData.EditServices[0])).ReturnsAsync(TestData.Services[0]);

            ServiceController controller = new ServiceController(
                _serviceBusinessService.Object,
                _vehicleBusinessService.Object,
                _userBusinessService.Object
            );
          
            return controller;
        }

        public void AsserEqualServices(Service service, BusinessService.Models.Service expected)
        {
            Xunit.Assert.Equal(expected.Id, service.Id);
            Xunit.Assert.Equal(expected.BasedOn, service.BasedOn);
            Xunit.Assert.Equal(expected.Description, service.Description);
            Xunit.Assert.Equal(expected.MileageReminder, service.MileageReminder);
            Xunit.Assert.Equal(expected.MileageRule, service.MileageRule);
            Xunit.Assert.Equal(expected.Name, service.Name);
            Xunit.Assert.Equal(expected.NextServiceMileage, service.NextServiceMileage);
            Xunit.Assert.Equal(expected.NextServiceReminderMileage, service.NextServiceReminderMileage);
            Xunit.Assert.Equal(expected.NextServiceTime, service.NextServiceTime);
            Xunit.Assert.Equal(expected.NextServiceReminderTime, service.NextServiceReminderTime);
            Xunit.Assert.Equal(expected.Recipient, service.Recipient);
            Xunit.Assert.Equal(expected.TimeReminder, service.TimeReminder);
            Xunit.Assert.Equal(expected.TimeReminderEntity, service.TimeReminderEntity);
            Xunit.Assert.Equal(expected.TimeRule, service.TimeRule);
            Xunit.Assert.Equal(expected.TimeRuleEntity, service.TimeRuleEntity);
            Xunit.Assert.Equal(expected.VehicleId, service.VehicleId);
        }

        public void AsserEqualServicesList(IEnumerable<Service> actual, BusinessService.Models.Service expected)
        {
            foreach (var service in actual)
            {
                AsserEqualServices(service, expected);
            }
        }

        /// <summary>
        /// Tests that GetByVehicleId endpoint
        /// returns all services per vehicle
        /// </summary>
        [Xunit.Fact()]
        public async Task GetByVehicleIdTest()
        {
            // Arrange
            var vehicleGuid = TestData.Vehicles[0].Id;
            var serviceController = ConfigureController();
            var expected = TestData.Services.Where(s => s.VehicleId == vehicleGuid).FirstOrDefault();

            //// Act
            var actual = await serviceController.GetByVehicleId(vehicleGuid, false);

            //// Assert
            Xunit.Assert.NotNull(actual);
            AsserEqualServicesList(actual.ToList(), expected);
        }

        /// <summary>
        /// Tests that PostService endpoint returns the created service
        /// </summary>
        [Xunit.Fact()]
        public async Task PostServiceTest()
        {
            // Arrange
            var serviceController = ConfigureController();
            var postService = new PostService
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
                VehicleId = TestData.Vehicles[0].Id
            };

            //// Act
            var actual = await serviceController.PostService(postService);

            //// Assert
            Xunit.Assert.NotNull(actual);
            _serviceBusinessService.Verify(s => s.PostService(It.IsAny<BusinessService.Models.PostService>()), Times.Once);
        }

        /// <summary>
        /// Tests that EditService endpoint returns the edited service
        /// </summary>
        [Xunit.Fact()]
        public async Task EditServiceTest()
        {
            // Arrange
            var serviceId = TestData.Services[0].Id;
            var serviceController = ConfigureController();
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

            //// Act
            var actual = await serviceController.EditService(serviceId, editService);

            //// Assert
            Xunit.Assert.NotNull(actual);
            _serviceBusinessService.Verify(s => s.EditService(It.IsAny<BusinessService.Models.EditService>()), Times.Once);
        }
    }
}
