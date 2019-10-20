import * as actionTypes from './actionTypes';

export function toggleAddEditForm(isOpenAddEditForm) {
    return {
        type: actionTypes.TOGGLE_ORDERS_ADD_EDIT_FORM,
        payload: !isOpenAddEditForm
    }
}
