import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isOpenAddEditForm: false,
    foodsData: [],
    isFetching: false //todo: Use this to tell the frontend that data is loading
};

export function FoodsReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.TOGGLE_FOODS_ADD_EDIT_FORM:
            return {
                ...state,
                isOpenAddEditForm: action.payload
            };
        case actionTypes.FETCH_FOODS_REQUEST:
            return {
                ...state,
                isFetching: !initialState.isFetching
            };
        case actionTypes.FETCH_FOODS_SUCCESS:
            return {
                ...state,
                foodsData: action.payload.data,
                isFetching: false
            };
        case actionTypes.FETCH_FOODS_FAIL:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}
