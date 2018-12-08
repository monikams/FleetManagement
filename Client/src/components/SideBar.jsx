import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SideBar.css';
import { withRouter } from 'react-router'

class SideBar extends React.Component {

  handleItemClick = (event) => {
    const { target : { textContent } } = event;
    this.props.router.push(textContent.toLowerCase());
    localStorage.removeItem('selectedTab');
    localStorage.setItem('selectedTab', textContent);
  }

  renderItem = (text, index) => (
      <div key={index} onClick={this.handleItemClick} className={text === localStorage.getItem('selectedTab') ? 'selectedIndicator' : 'item'}>
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