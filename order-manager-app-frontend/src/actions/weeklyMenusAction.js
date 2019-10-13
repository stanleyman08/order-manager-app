import * as actionTypes from './actionTypes';

export function toggleAddEditForm(isOpenAddEditForm) {
    return {
        type: actionTypes.TOGGLE_WEEKLY_MENUS_ADD_EDIT_FORM,
        payload: !isOpenAddEditForm
    }
}
