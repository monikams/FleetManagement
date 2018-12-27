import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SideBar.css';
import { withRouter } from 'react-router';

class SideBar extends React.Component {

  renderItem = (text, index) => (
      <div key={index} onClick={this.props.onItemClick} className={text.toLowerCase() === localStorage.getItem('selectedTab') ? 'selectedIndicator' : 'item'}>
        <div className='itemText'>
            <span className='titleClass'>{text}</span>
        </div>
      </div>
  );
 
  render() {
    const { id, items } = this.props;

    return (
      <div id={id} className='sideBar'>
        {items.map((item, index) => this.renderItem(item,index))}
      </div>
    );
  }
}

SideBar.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default withRouter(SideBar);