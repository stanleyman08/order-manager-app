import * as actionTypes from './actionTypes';
import Api from '../services/api';

export function getCustomersRequest() {return {type: actionTypes.FETCH_CUSTOMERS_REQUEST}}
export function getCustomersSuccess(data) {return {type: actionTypes.FETCH_CUSTOMERS_SUCCESS, payload: data}}
export function getCustomersFail() {return {type: actionTypes.FETCH_CUSTOMERS_FAIL}}

export function postCustomersRequest() {return {type: actionTypes.POST_CUSTOMERS_REQUEST}}
export function postCustomersSuccess(data) {return {type: actionTypes.POST_CUSTOMERS_SUCCESS, payload: data}}
export function postCustomersFail() {return {type: actionTypes.POST_CUSTOMERS_FAIL}}

export function putCustomersRequest() {return {type: actionTypes.PUT_CUSTOMERS_REQUEST}}
export function putCustomersSuccess(data) {return {type: actionTypes.PUT_CUSTOMERS_SUCCESS}}
export function putCustomersFail() {return {type: actionTypes.PUT_CUSTOMERS_FAIL}}

export function deleteCustomersRequest() {return {type: actionTypes.DELETE_CUSTOMERS_REQUEST}}
export function deleteCustomersSuccess(data) {return {type: actionTypes.DELETE_CUSTOMERS_SUCCESS}}
export function deleteCustomersFail() {return {type: actionTypes.DELETE_CUSTOMERS_FAIL}}

export function toggleAddEditForm(isOpenAddEditForm) {return {type: actionTypes.TOGGLE_CUSTOMERS_ADD_EDIT_FORM, payload: !isOpenAddEditForm}}

export function getAllCustomers() {
    return dispatch => {
        dispatch(getCustomersRequest());
        Api.get('customers')
            .then(response => {
                dispatch(getCustomersSuccess(response.data))
            })
            .catch(error => {
                dispatch(getCustomersFail());
            });
    }
}

export function getCustomersById(id) {
    return dispatch => {
        dispatch(getCustomersRequest());
        Api.get('customers/' + id)
            .then(response => {
                dispatch(getCustomersSuccess(response.data));
            })
            .catch(error => {
                dispatch(getCustomersFail());
            })
    }
}

export function createCustomer(customer) {
    return dispatch => {
        dispatch(postCustomersRequest());
        console.log(customer);
        Api.post('customers', customer)
            .then(response => {
                dispatch(postCustomersSuccess(response.data));
                dispatch(getAllCustomers());
            })
            .catch(error => {
                dispatch(postCustomersFail());
            })
    }
}

export function updateCustomer(id, customer) {
    return dispatch => {
        dispatch(putCustomersRequest());
        Api.put('customers/' + id, customer)
            .then(response => {
                dispatch(putCustomersSuccess(response.data));
                dispatch(getAllCustomers());
            })
            .catch(error => {
                dispatch(putCustomersFail());
            })
    }
}

export function deleteCustomer(id) {
    return dispatch => {
        dispatch(deleteCustomersRequest());
        Api.delete('customers/' + id)
            .then(response => {
                dispatch(deleteCustomersSuccess(response.data));
                dispatch(getAllCustomers());
            })
            .catch(error => {
                dispatch(deleteCustomersFail());
            })
    }
}
