import { connect } from 'react-redux';
import React from "react";
import {bindActionCreators} from "redux";

import CustomersViews from '../views/customers/customersViews';
import {
    createCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomersById,
    toggleAddEditForm,
    updateCustomer
} from "../actions/customersAction";

class CustomersContainer extends React.Component {
    componentDidMount(): void {
        this.props.getAllCustomers();
    }

    render() {
        return (
            <CustomersViews
                toggleAddEditForm={this.props.toggleAddEditForm}
                isOpenAddEditForm={this.props.isOpenAddEditForm}
                createCustomer={this.props.createCustomer}
                deleteCustomer={this.props.deleteCustomer}
                updateCustomer={this.props.updateCustomer}
                customersData={this.props.customersData}
            />
        )
    }
}
const mapStateToProps = state => ({
    isOpenAddEditForm: state.CustomersReducer.isOpenAddEditForm,
    customersData: state.CustomersReducer.customersData
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {toggleAddEditForm, getAllCustomers, createCustomer, deleteCustomer, updateCustomer, getCustomersById},
        dispatch
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomersContainer)
