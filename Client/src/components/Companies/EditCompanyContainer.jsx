import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
import { withStyles } from '@material-ui/core/styles';
import UsersStore from '../../stores/UsersStore';
import UsersActions from '../../actions/UsersActions.js';
import CompaniesActions from '../../actions/CompaniesActions.js';
import CompaniesStore from '../../stores/CompaniesStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import Input from '@material-ui/core/Input';
import EditCompany from './EditCompany';
import SideBar from '../SideBar';
import isEmpty from 'lodash/isEmpty';
import { setSideBarItem } from '../../utils/authorized-requests.js';

const styles = theme => ({
   root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
});

class EditCompanyContainer extends Component {

     constructor(props) {
        super(props);
        this.state = {
            localCompany: Immutable.Map({
                Id: '',
                CreatorId: '',
                Name: '',
                Email: '',
                Address: '',
                Telephone: '',
                Subscribers: Immutable.List(),
                Creator: {},
            }),
            isValid: {
                'Name': true,
                'Email': true,
                'Address': true,
                'ValidEmail': true,
                'ValidPhone': true,
            },
		} 
    }

    static getStores() {
        return [UsersStore, CompaniesStore];
    }

    static getPropsFromStores() {
        return {
            users: UsersStore.getUsers(),
            company: CompaniesStore.getCompany(),           
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);

    componentWillMount() {
        const { params: { companyId } } = this.props;
        UsersActions.loadUsers();
        CompaniesActions.loadCompany(companyId);
        setSideBarItem('companies');
    }

    componentWillReceiveProps = nextProps => {
        if (this.props.company !== nextProps.company) {
          const company = nextProps.company;
          
          const localCompany = Immutable.Map({
                Id: company.get('Id'),
                Name: company.get('Name'),
                Email: company.get('Email'),
                Address: company.get('Address'),
                Telephone: company.get('Telephone'),
                CreatorId: company.get('CreatorId'),
                Subscribers: company.get('Subscribers'),
            });
          this.setState({ localCompany });
        }
    }

    componentWillUnmount() { 
        CompaniesActions.unloadCompany();
        UsersActions.unloadUsers();
    }

    handleSaveButtonClick = () => {
       const { localCompany, localCompany: { subscribers } } = this.state;
       const { users } = this.props;
       CompaniesActions.editCompany(localCompany);
    }

    handleChange = (name, event) => {
        const { target: { value }} = event;  
        const { localCompany, isValid } = this.state;
        isValid[name] = !isEmpty(value);   
        const updatedCompany = localCompany.update(name, oldValue => value);
        this.setState({ 
            localCompany: updatedCompany,
            isValid: isValid
        });
    };

    handleBlur = (name, event) => {
        const { target: { value }} = event;     
        const { localCompany, isValid } = this.state;
        const emailRegExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneRegExpression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        let updatedCompany;
        if (name === 'ValidEmail') {
            isValid[name] = emailRegExpression.test(String(value).toLowerCase());           
        } else if (name === 'ValidPhone') {
            isValid[name] = phoneRegExpression.test(String(value).toLowerCase());
        }  

         if (!isValid[name]) {
            updatedCompany = localCompany.update(name, oldValue => '');
        } else {
            updatedCompany = localCompany.update(name, oldValue => value); 
        }

        this.setState({ localCompany: updatedCompany });
    };

    handleUserDropdownChange = event => {
        const { users } = this.props;
        const { localCompany } = this.state;
        const { target: { value } } = event;   
        let updatedCompany;
        let selectedUsers;

        if(localCompany) {
             let subscribers = localCompany.get("Subscribers").map(user => user.UserName); 
             const index = subscribers.findIndex(name => name === value);
            if (index === -1) {
               subscribers.push(value);         
            } else {
               subscribers.splice(index, 1);
            }

            selectedUsers = subscribers.map(name => users.filter(user => user.UserName === name)).map(user => user.first());
            updatedCompany = localCompany.update('Subscribers', subscribers => selectedUsers);        
        }
       
       this.setState({ localCompany: updatedCompany });
     };

     handleItemClick = (event) => {
        const { target : { textContent } } = event;
        this.props.router.push(`/companies`);
    }

    render() {      
        const { users, classes, company, params: { companyId  } } = this.props;
        const { isValid } = this.state;
        const { localCompany } = this.state;
        const items = ['Companies'];
        
        return (
            <div className={classes.root} >
                <SideBar id='editCompanySidebar' items={items} onItemClick={this.handleItemClick} />
                <EditCompany
                    company={localCompany}
                    users={users}
                    companyId={companyId}
                    onDropownChange={this.handleUserDropdownChange} 
                    onSaveButtonClick={this.handleSaveButtonClick}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    isValid={isValid}
                />
            </div>    
        );
    }
}

EditCompanyContainer.propTypes = {
    users: PropTypes.instanceOf(Immutable.Iterable),
    company: PropTypes.instanceOf(Immutable.Map),
    params: PropTypes.object.isRequired,
};

EditCompanyContainer.defaultProps = {
    users: Immutable.List(),
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
};

export default withStyles(styles)(connectToStores(EditCompanyContainer));
