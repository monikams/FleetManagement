import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SideBar.css';
import { withRouter } from 'react-router'

class SideBar extends React.Component {

  constructor(props) {
    super(props)
  }

    handleItemClick = (event) => {
      const { target : { textContent } } = event;
      this.props.router.push(textContent.toLowerCase());
    }

    renderItem = (text, index) => (
       <div key={index} onClick={this.handleItemClick} className='item'>
          <div className='itemText'>
              <span className='titleClass'>{text}</span>
          </div>
          <div className='selectedIndicator'></div>
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