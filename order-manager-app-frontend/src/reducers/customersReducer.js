import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isOpenAddEditForm: false,
    customersData: []
};

export function CustomersReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.TOGGLE_CUSTOMERS_ADD_EDIT_FORM:
            return {
                ...state,
                isOpenAddEditForm: action.payload
            };
        case actionTypes.FETCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customersData: action.payload.data
            }
        default:
            return state;
    }
}
