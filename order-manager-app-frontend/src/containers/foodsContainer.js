import { connect } from 'react-redux';

import FoodsViews from '../views/foods/foodsViews';
import {getAllFoods, toggleAddEditForm} from "../actions/foodsAction";
import React from "react";
import {bindActionCreators} from "redux";

class FoodsContainer extends React.Component {
    componentDidMount(): void {
        this.props.getAllFoods();
    }

    render() {
        return (
            <FoodsViews toggleAddEditForm={this.props.toggleAddEditForm} isOpenAddEditForm={this.props.isOpenAddEditForm}/>
        )
    }
}

const mapStateToProps = state => ({
    isOpenAddEditForm: state.FoodsReducer.isOpenAddEditForm
});

const mapDispatchToProps = dispatch => ({
    toggleAddEditForm: bindActionCreators(toggleAddEditForm, dispatch),
    getAllFoods: bindActionCreators(getAllFoods, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodsContainer)
