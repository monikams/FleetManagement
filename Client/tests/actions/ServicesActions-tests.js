import ServicesActions from '../../src/actions/ServicesActions';
import ServicesService from '../../src/services/ServicesService';

describe('ServicesActions', () => {
  let spy;
  let companyId;
  let vehicleId;
  let service;

  beforeEach(() => {
    companyId = '4E72A86C-23F9-4D32-A5E6-AD1D0E37E089';
    vehicleId = '59d84100-5d44-4e7f-b72c-84d9237e32ff';
    service = {
        'BasedOn': 0,
        'Created': "2019-01-27T09:49:37+00:00",
        'Description': "",
        'Id': "21b33d8f-d9d4-4e85-a563-146d7a31393b",
        'MileageReminder': 0,
        'MileageRule': 0,
        'Name': "Car Wash",
        'NextServiceMileage': null,
        'NextServiceReminderMileage': null,
        'NextServiceReminderTime': "2019-02-25T09:49:37+00:00",
        'NextServiceTime': "2019-02-27T09:49:37+00:00",
        'Recipient': "monikaspasova1@gmail.com",
        'TimeReminder': 2,
        'TimeReminderEntity': 1,
        'TimeRule': 1,
        'TimeRuleEntity': 2,
        'Vehicle': {Id: "00bf2ce9-6fcf-4586-b768-e7ee082b32b4", VIN: "3C6JR6AG8DG538799", PlateNumber: "136-SMTR", Type: "car", Brand: "Toyota", },
        'VehicleId': "00bf2ce9-6fcf-4586-b768-e7ee082b32b4"
    }
  });

  it('createService() successfully fires ServicesService.createService', () => {
    const spy = sinon.spy(ServicesService, 'createService');
    ServicesActions.createService(service, companyId);
    expect(spy.callCount).to.equal(1);
    spy.restore();
  });

  it('loadService() successfully fires ServicesService.loadService', () => {
    const spy = sinon.spy(ServicesService, 'getService');
    ServicesActions.loadService(service['Id']);
    expect(spy.callCount).to.equal(1);
    spy.restore();
  });

 it('loadServices() successfully fires ServicesService.loadServices', () => {
    const spy = sinon.spy(ServicesService, 'getServices');
    ServicesActions.loadServices(vehicleId);
    expect(spy.callCount).to.equal(1);
    spy.restore();
  });

  it('editService() successfully fires ServicesService.editService', () => {
    const spy = sinon.spy(ServicesService, 'editService');
    ServicesActions.editService(service, companyId);
    expect(spy.callCount).to.equal(1);
    spy.restore();
  });

  it('deleteService() successfully fires ServicesService.deleteService', () => {
    const spy = sinon.spy(ServicesService, 'deleteService');
    ServicesActions.deleteService(service.Id);
    expect(spy.callCount).to.equal(1);
    spy.restore();
  });

  it('markServiceAsDone() successfully fires ServicesService.markServiceAsDone', () => {
    const spy = sinon.spy(ServicesService, 'markServiceAsDone');
    ServicesActions.markServiceAsDone(service.Id);
    expect(spy.callCount).to.equal(1);
    spy.restore();
  });
});
