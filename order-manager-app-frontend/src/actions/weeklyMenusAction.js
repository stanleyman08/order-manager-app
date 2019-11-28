import * as actionTypes from './actionTypes';
import Api from '../services/api';

export function toggleAddEditForm(isOpenAddEditForm) {
    return {
        type: actionTypes.TOGGLE_WEEKLY_MENUS_ADD_EDIT_FORM,
        payload: !isOpenAddEditForm
    }
}

export function getWeeklyMenusRequest() {return {type: actionTypes.FETCH_WEEKLY_MENUS_REQUEST}}
export function getWeeklyMenusSuccess(data) {return {type: actionTypes.FETCH_WEEKLY_MENUS_SUCCESS, payload: data}}
export function getWeeklyMenusFail() {return {type: actionTypes.FETCH_WEEKLY_MENUS_FAIL}}

export function postWeeklyMenusRequest() {return {type: actionTypes.POST_WEEKLY_MENUS_REQUEST}}
export function postWeeklyMenusSuccess(data) {return {type: actionTypes.POST_WEEKLY_MENUS_SUCCESS, payload: data}}
export function postWeeklyMenusFail() {return {type: actionTypes.POST_WEEKLY_MENUS_FAIL}}

export function putWeeklyMenusRequest() {return {type: actionTypes.PUT_WEEKLY_MENUS_REQUEST}}
export function putWeeklyMenusSuccess(data) {return {type: actionTypes.PUT_WEEKLY_MENUS_SUCCESS, payload: data}}
export function putWeeklyMenusFail() {return {type: actionTypes.PUT_WEEKLY_MENUS_FAIL}}

export function deleteWeeklyMenusRequest() {return {type: actionTypes.DELETE_WEEKLY_MENUS_REQUEST}}
export function deleteWeeklyMenusSuccess(data) {return {type: actionTypes.DELETE_WEEKLY_MENUS_SUCCESS, payload: data}}
export function deleteWeeklyMenusFail() {return {type: actionTypes.DELETE_WEEKLY_MENUS_FAIL}}

export function getAllWeeklyMenus() {
    return dispatch => {
        dispatch(getWeeklyMenusRequest());
        Api.get('weeklyMenus')
            .then(response => {
                dispatch(getWeeklyMenusSuccess(response.data));
            })
            .catch(error => {
                dispatch(getWeeklyMenusFail());
            })
    };
}

export function getWeeklyMenusById(id) {
    return dispatch => {
        dispatch(getWeeklyMenusRequest());
        Api.get('weeklyMenus/' + id)
            .then(response => {
                dispatch(getWeeklyMenusSuccess(response.data));
            })
            .catch(error => {
                dispatch(getWeeklyMenusFail());
            })
    }
}

export function getWeeklyMenusByDate(menuDate) {
    return dispatch => {
        dispatch(getWeeklyMenusRequest());
        console.log(menuDate);
        Api.get('weeklyMenus', {params: {menuDate: menuDate}})
            .then(response => {
                console.log(response.data);
                dispatch(getWeeklyMenusSuccess(response.data.data));
            })
            .catch(error => {
                dispatch(getWeeklyMenusFail());
            })
    }
}

export function createWeeklyMenu(weeklyMenu) {
    return dispatch => {
        dispatch(postWeeklyMenusRequest());
        console.log(weeklyMenu);
        Api.post('weeklyMenus', weeklyMenu)
            .then(response => {
                dispatch(postWeeklyMenusSuccess(response.data));
                dispatch(getAllWeeklyMenus());
            })
            .catch(error => {
                dispatch(postWeeklyMenusFail());
            })
    }
}

export function updateWeeklyMenu(id, weeklyMenu) {
    return dispatch => {
        dispatch(putWeeklyMenusRequest());
        Api.put('weeklyMenus/' + id, weeklyMenu)
            .then(response => {
                dispatch(putWeeklyMenusSuccess(response.data));
                dispatch(getAllWeeklyMenus());
            })
            .catch(error => {
                dispatch(putWeeklyMenusFail());
            })
    }
}

export function deleteWeeklyMenu(id) {
    return dispatch => {
        dispatch(deleteWeeklyMenusRequest());
        Api.delete('weeklyMenus/' + id)
            .then(response => {
                dispatch(deleteWeeklyMenusSuccess(response.data));
                dispatch(getAllWeeklyMenus());
            })
            .catch(error => {
                dispatch(deleteWeeklyMenusFail());
            })
    }
}

export function setWeeklyMenusDate(date) {
    console.log(date);
    return {
        type: actionTypes.SET_WEEKLY_MENUS_DATE,
        payload: date
    }
}

