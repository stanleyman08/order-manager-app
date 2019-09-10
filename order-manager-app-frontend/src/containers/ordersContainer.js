import { connect } from 'react-redux';

import OrdersView from '../views/orders/ordersViews';
import { toggleAddEditForm } from "../actions/ordersAction";

const mapStateToProps = state => ({
    isOpenAddEditForm: state.OrdersReducer.isOpenAddEditForm
});

const mapDispatchToProps = dispatch => ({
    toggleAddEditForm: (isOpenAddEditForm) => dispatch(toggleAddEditForm(isOpenAddEditForm))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrdersView)
