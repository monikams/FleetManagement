import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SideBar.css';
import { withRouter } from 'react-router';
import { baseURL } from '../Constants.js';

class SideBar extends React.Component {

  handleItemClick = (event) => {
    const { target : { textContent } } = event;
    window.location.href = baseURL + `/${textContent.toLowerCase()}`;
    localStorage.removeItem('selectedTab');
    localStorage.setItem('selectedTab', textContent.toLowerCase());
  }

  renderItem = (text, index) => (
      <div key={index} onClick={this.handleItemClick} className={text.toLowerCase() === localStorage.getItem('selectedTab') ? 'selectedIndicator' : 'item'}>
        <div className='itemText'>
            <span className='titleClass'>{text}</span>
        </div>
      </div>
  );
 
  render() {
    const { id } = this.props;
    const items = ['Companies', 'Drivers', 'Vehicles', 'Services']

    return (
      <div id={id} className='sideBar'>
        {items.map((item, index) => this.renderItem(item,index))}
      </div>
    );
  }
}

SideBar.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withRouter(SideBar);