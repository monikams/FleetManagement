import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import React from 'react';
import Immutable from 'immutable';
import ServicesContainer from '../../../src/components/Services/ServicesContainer';

configure({ adapter: new Adapter() });
global.sinon = sinon;

const props = { 
  services: Immutable.List([{ 
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
  }]),
}

describe('<ServicesContainer />', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = mount(<ServicesContainer/>);  
    });
  
    afterEach(() => {
      wrapper.unmount();    
    });

     it('renders Overdue Services button', () => {
      var overdueServicesButton = wrapper.find('Checkbox'); 
      expect(overdueServicesButton.length).equals(1);
    });   

    it('renders Create Service button', () => {
      var createServiceButton = wrapper.find('#createServiceButton');
      expect(createServiceButton.length).equals(1);
    });
  
    it('renders the Table component', () => {
      var servicesList = wrapper.find('Table'); 
      expect(servicesList.length).equals(1);
    });

    // it('r', () => {
    //   var checkCircle = wrapper.find('CheckCircle'); 
    //   var markAsDoneButton = checkCircle.find('#markAsDone-21b33d8f-d9d4-4e85-a563-146d7a31393b');
    //   expect(markAsDoneButton.length).equals(1);
    // });          
});