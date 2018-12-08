import React, { Component } from 'react';
import PropTypes from "prop-types";
import Immutable from 'immutable';
import shallowEqual from 'shallowequal';
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
        CompaniesActions.loadCompany(companyId, true);
    }

    componentWillReceiveProps = nextProps => {
        if (this.props.company !== nextProps.company) {
          const company = nextProps.company.get('company');
          const users = nextProps.users;
          
          const localCompany = Immutable.Map({
                Id: company.get('Id'),
                Name: company.get('Name'),
                Email: company.get('Email'),
                Address: company.get('Address'),
                Telephone: company.get('Telephone'),
                CreatorId: company.get('CreatorId'),
                Subscribers: users,
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
        const { localCompany } = this.state;   
        const updatedCompany = localCompany.update(name, oldValue => value);
        this.setState({ localCompany: updatedCompany });
    };

    handleUserDropdownChange = event => {
        const { users } = this.props;
        const { localCompany } = this.state;
        const { target: { value } } = event;   
        let updatedCompany;
        let selectedUsers;

        if(localCompany) {
             const subscribers = localCompany.get("Subscribers").map(user => user.UserName); 
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

    render() {      
        const { users, classes, company, params: { companyId  } } = this.props;
        const { localCompany } = this.state;   
        
        return (
            <EditCompany
                company={localCompany}
                users={users}
                companyId={companyId}
                onDropownChange={this.handleUserDropdownChange} 
                onSaveButtonClick={this.handleSaveButtonClick}
                onChange={this.handleChange}
            />
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
        isLoading: true,
        doneLoading: false,
    }),
};

export default connectToStores(EditCompanyContainer);
