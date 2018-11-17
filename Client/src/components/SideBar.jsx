import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SideBar.css';

class SideBar extends React.Component {
 
  render() {
    const { id } = this.props;

    return (
      <div id={id} className='sideBar'>
        <div onClick={() => {}} className='item'>
          <div className='itemText'>
              <span className='titleClass'>Companies</span>
          </div>
          <div className='selectedIndicator'></div>
        </div>
        <div onClick={() => {}} className='item'>
          <div className='itemText'>
              <span className='titleClass'>Drivers</span>
          </div>
          <div className='selectedIndicator'></div>
        </div>
        <div onClick={() => {}} className='item'>
          <div className='itemText'>
              <span className='titleClass'>Vehicles</span>
          </div>
          <div className='selectedIndicator'></div>
        </div>
        <div onClick={() => {}} className='item'>
          <div className='itemText'>
              <span className='titleClass'>Services</span>
          </div>
          <div className='selectedIndicator'></div>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SideBar;