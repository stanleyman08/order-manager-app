import * as actionTypes from './actionTypes';

export function toggleAddEditForm(isOpenAddEditForm) {
    return {
        type: actionTypes.TOGGLE_CUSTOMERS_ADD_EDIT_FORM,
        payload: !isOpenAddEditForm
    }
}
