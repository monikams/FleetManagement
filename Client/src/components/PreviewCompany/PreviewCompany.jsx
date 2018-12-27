import React from 'react';
import PropTypes from 'prop-types';
import SideBar from '../SideBar';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import '../../styles/PreviewCompany.css';

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
};

class PreviewCompany extends React.Component {

  componentWillMount() {
    const { params: { companyId } } = this.props;
    localStorage.removeItem('selectedTab');
    localStorage.setItem('selectedTab', 'drivers');
  }

   handleItemClick = (event) => {
    const { target : { textContent } } = event;
    const { params: { companyId } } = this.props;
    localStorage.removeItem('selectedTab');
    localStorage.setItem('selectedTab', textContent.toLowerCase());

    if (textContent.toLowerCase() === 'companies') {
      this.props.router.push('/companies');
    } else if (textContent.toLowerCase() === 'drivers') {
      this.props.router.push(`/companies/${companyId}`);
    } else {
      this.props.router.replace(`/companies/${companyId}/${textContent.toLowerCase()}`);
    }
  }

  render() {
    const { children, classes, params: { companyId } } = this.props;
    const items = ['Companies', 'Drivers', 'Vehicles'];

    return (
      <div className={classes.root}>
          <SideBar id='previewCompanySidebar' items={items} onItemClick={this.handleItemClick} />
          <div className='children' >
            {children}
          </div>
      </div>
    );
  }
}

PreviewCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
};

PreviewCompany.defaultProps = {
    classes: {},
    children: null,
    params: {},
};


export default  withStyles(styles)(withRouter(PreviewCompany))