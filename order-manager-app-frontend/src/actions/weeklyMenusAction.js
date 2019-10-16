import * as actionTypes from './actionTypes';
import Api from '../services/api';

export function toggleAddEditForm(isOpenAddEditForm) {
    return {
        type: actionTypes.TOGGLE_WEEKLY_MENUS_ADD_EDIT_FORM,
        payload: !isOpenAddEditForm
    }
}

export function getAllWeeklyMenus() {
    return dispatch => {
        Api.get('foods')
            .then(response => console.log(response));
    };
}
