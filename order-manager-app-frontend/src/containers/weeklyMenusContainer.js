import { connect } from 'react-redux';

import { toggleAddEditForm } from "../actions/weeklyMenusAction";
import WeeklyMenusViews from "../views/weeklyMenus/weeklyMenusViews";



const mapStateToProps = state => ({
    isOpenAddEditForm: state.WeeklyMenusReducer.isOpenAddEditForm
});

const mapDispatchToProps = dispatch => ({
    toggleAddEditForm: (isOpenAddEditForm) => dispatch(toggleAddEditForm(isOpenAddEditForm))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeeklyMenusViews)
