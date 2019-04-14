import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import React from 'react';
import CreateServiceContainer from '../../../src/components/Services/CreateServiceContainer';

configure({ adapter: new Adapter() });
global.sinon = sinon;

describe('<CreateServiceContainer />', () => {
    let wrapper;
    
    beforeEach(() => {
      debugger;
      wrapper = mount(<CreateServiceContainer/>);  
    });
  
    afterEach(() => {
      wrapper.unmount();    
    });
  
    it('becomes visible after create dish button is clicked', () => {
           debugger;
           expect(1).equals(1);
    });  
});