import { connect } from 'react-redux';

import FoodsView from '../views/foods/foodsViews';
import { toggleAddEditForm } from "../actions/foodsAction";

const mapStateToProps = state => ({
    isOpenAddEditForm: state.FoodsReducer.isOpenAddEditForm
});

const mapDispatchToProps = dispatch => ({
    toggleAddEditForm: (isOpenAddEditForm) => dispatch(toggleAddEditForm(isOpenAddEditForm))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodsView)
