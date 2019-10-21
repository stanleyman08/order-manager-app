import * as actionTypes from './actionTypes';
import Api from '../services/api';

export function toggleAddEditForm(isOpenAddEditForm) {return {type: actionTypes.TOGGLE_ORDERS_ADD_EDIT_FORM, payload: !isOpenAddEditForm}}

export function getSchoolsRequest() {return {type: actionTypes.FETCH_SCHOOLS_REQUEST}}
export function getSchoolsSuccess(data) {return {type: actionTypes.FETCH_SCHOOLS_SUCCESS, payload: data}}
export function getSchoolsFail() {return {type: actionTypes.FETCH_SCHOOLS_FAIL}}

export function postSchoolsRequest() { return { type: actionTypes.POST_SCHOOLS_REQUEST}}
export function postSchoolsSuccess(data) {return {type: actionTypes.POST_SCHOOLS_SUCCESS, payload: data}}
export function postSchoolsFail() { return { type: actionTypes.POST_SCHOOLS_FAIL}}

export function putSchoolsRequest() { return { type: actionTypes.PUT_SCHOOLS_REQUEST}}
export function putSchoolsSuccess(data) { return { type: actionTypes.PUT_SCHOOLS_SUCCESS, payload: data}}
export function putSchoolsFail() { return { type: actionTypes.PUT_SCHOOLS_FAIL}}

export function deleteSchoolsRequests() { return { type: actionTypes.DELETE_SCHOOLS_REQUEST}}
export function deleteSchoolsSuccess(data) { return { type: actionTypes.DELETE_SCHOOLS_SUCCESS, payload: data}}
export function deleteSchoolsFail() { return { type: actionTypes.DELETE_SCHOOLS_FAIL}}

export function getAllSchools() {
    return dispatch => {
        dispatch(getSchoolsRequest());
        Api.get('schools')
            .then(response => {
                dispatch(getSchoolsSuccess(response.data));
            })
            .catch(error => {
                dispatch(getSchoolsFail());
            });
    }
}

export function getSchoolsById(id) {
    return dispatch => {
        dispatch(getSchoolsRequest());
        Api.get('schools/' + id)
            .then(response => {
                dispatch(getSchoolsSuccess(response.data));
            })
            .catch(error => {
                dispatch(getSchoolsFail());
            })
    }
}

export function createSchool(school) {
    return dispatch => {
        dispatch(postSchoolsRequest());
        Api.post('schools', school)
            .then(response => {
                dispatch(postSchoolsSuccess(response.data));
                dispatch(getAllSchools());
            })
            .catch(error => {
                dispatch(postSchoolsFail());
            })
    }
}

export function updateSchool(id, school) {
    return dispatch => {
        dispatch(putSchoolsRequest());
        Api.put('schools/' + id, school)
            .then(response => {
                dispatch(putSchoolsSuccess(response.data));
                dispatch(getAllSchools());
            })
            .catch(error => {
                dispatch(putSchoolsFail());
            })
    }
}

export function deleteSchool(id) {
    return dispatch => {
        dispatch(deleteSchoolsRequests());
        Api.delete('schools/' + id)
            .then(response => {
                dispatch(deleteSchoolsSuccess(response.data));
                dispatch(getAllSchools());
            })
            .catch(error => {
                dispatch(deleteSchoolsFail());
            })
    }
}
