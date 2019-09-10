import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isOpenAddEditForm: false
};

export function OrdersReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.TOGGLE_ORDERS_ADD_EDIT_FORM:
            return {
                ...state,
                isOpenAddEditForm: action.payload
            };
        default:
            return state;
    }
}
