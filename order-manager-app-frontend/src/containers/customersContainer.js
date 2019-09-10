import { connect } from 'react-redux';

import CustomersView from '../views/customers/customersViews';
import { toggleAddEditForm } from "../actions/customersAction";

const mapStateToProps = state => ({
    isOpenAddEditForm: state.CustomersReducer.isOpenAddEditForm
});

const mapDispatchToProps = dispatch => ({
    toggleAddEditForm: (isOpenAddEditForm) => dispatch(toggleAddEditForm(isOpenAddEditForm))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomersView)
