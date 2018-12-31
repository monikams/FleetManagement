import React from 'react';
import PropTypes from 'prop-types';
import SideBar from '../SideBar';
import CompaniesStore from '../../stores/CompaniesStore';
import CompaniesActions from '../../actions/CompaniesActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import { withStyles } from '@material-ui/core/styles';
import Immutable from 'immutable';
import { withRouter } from 'react-router';

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
  children: {
    flexGrow: 4,
    margin: '10px 30px 30px 30px',
  },
  companyName: {
	  fontSize: '16px',
	  fontFamily: 'Arial',
  },
  companyNameSpan: {
	  fontWeight: 'bold',
  },
};

class PreviewCompany extends React.Component {

   static getStores() {
        return [CompaniesStore];
    }

    static getPropsFromStores() {
        return {
            company: CompaniesStore.getCompany(),      
        }
    }

  componentWillMount() {
    const { params: { companyId } } = this.props;
    CompaniesActions.loadCompany(companyId);
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
    const { children, classes, company } = this.props;
    const items = ['Companies', 'Drivers', 'Vehicles'];

    return (
      <div className={classes.root}>
          <SideBar id='previewCompanySidebar' items={items} onItemClick={this.handleItemClick} />
          <div className={classes.children} >
            <p className={classes.companyName} ><span><span className={classes.companyNameSpan}> Company Name: </span>{company.get('Name')}</span></p>
            {children}
          </div>
      </div>
    );
  }
}

PreviewCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.instanceOf(Immutable.Map),
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
};

PreviewCompany.defaultProps = {
    classes: {},
    company: Immutable.Map({
        Id: '',
        CreatorId: '',
        Name: '',
        Email: '',
        Address: '',
        Telephone: '',
        Subscribers: Immutable.List(),
        Creator: {},
    }),
    children: null,
    params: {},
};


export default  withStyles(styles)(withRouter(connectToStores(PreviewCompany)));