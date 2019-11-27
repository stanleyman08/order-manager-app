import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isOpenAddEditForm: false,
    menuDate: new Date(),
    weeklyMenusData: [
        {day: 'monday', menu: []},
        {day: 'tuesday', menu: []},
        {day: 'wednesday', menu: []},
        {day: 'thursday', menu: []},
        {day: 'friday', menu: []},
        {day: 'saturday', menu: []},
        {day: 'sunday', menu: []}
    ]
};

export function WeeklyMenusReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.TOGGLE_WEEKLY_MENUS_ADD_EDIT_FORM:
            return {
                ...state,
                isOpenAddEditForm: action.payload
            };
        case actionTypes.SET_WEEKLY_MENUS_DATE:
            return {
                ...state,
                menuDate: action.payload
            };
        default:
            return state;
    }
}
