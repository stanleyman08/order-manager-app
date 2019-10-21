import * as actionTypes from './actionTypes';
import Api from '../services/api';

export function toggleAddEditForm(isOpenAddEditForm) { return {type: actionTypes.TOGGLE_FOODS_ADD_EDIT_FORM, payload: !isOpenAddEditForm}}

export function getFoodsRequest() {return {type: actionTypes.FETCH_FOODS_REQUEST}}
export function getFoodsSuccess(data) {return {type: actionTypes.FETCH_FOODS_SUCCESS, payload: data}}
export function getFoodsFail() {return {type: actionTypes.FETCH_FOODS_FAIL,}}

export function postFoodsRequest() { return { type: actionTypes.POST_FOODS_REQUEST}}
export function postFoodsSuccess(data) {return {type: actionTypes.POST_FOODS_SUCCESS, payload: data}}
export function postFoodsFail() { return { type: actionTypes.POST_FOODS_FAIL}}

export function putFoodsRequest() { return { type: actionTypes.PUT_FOODS_REQUEST}}
export function putFoodsSuccess(data) { return { type: actionTypes.PUT_FOODS_SUCCESS, payload: data}}
export function putFoodsFail() { return { type: actionTypes.PUT_FOODS_FAIL}}

export function deleteFoodsRequests() { return { type: actionTypes.DELETE_FOODS_REQUEST}}
export function deleteFoodsSuccess(data) { return { type: actionTypes.DELETE_FOODS_SUCCESS, payload: data}}
export function deleteFoodsFail() { return { type: actionTypes.DELETE_FOODS_FAIL}}

export function getAllFoods() {
    return dispatch => {
        dispatch(getFoodsRequest());
        Api.get('foods')
            .then(response => {
                dispatch(getFoodsSuccess(response.data));
            })
            .catch(error => {
               dispatch(getFoodsFail());
            });
    }
}

export function getFoodsById(id) {
    return dispatch => {
        dispatch(getFoodsRequest());
        Api.get('foods/' + id)
            .then(response => {
                dispatch(getFoodsSuccess(response.data));
            })
            .catch(error => {
                dispatch(getFoodsFail());
            })
    }
}

export function createFood(food) {
    return dispatch => {
        dispatch(postFoodsRequest());
        Api.post('foods', food)
            .then(response => {
                dispatch(postFoodsSuccess(response.data));
                dispatch(getAllFoods());
            })
            .catch(error => {
                dispatch(postFoodsFail());
            })
    }
}

export function updateFood(id, food) {
    return dispatch => {
        dispatch(putFoodsRequest());
        Api.put('foods/' + id, food)
            .then(response => {
                dispatch(putFoodsSuccess(response.data));
                dispatch(getAllFoods());
            })
            .catch(error => {
                dispatch(putFoodsFail());
            })
    }
}

export function deleteFood(id) {
    return dispatch => {
        dispatch(deleteFoodsRequests());
        Api.delete('foods/' + id)
            .then(response => {
                dispatch(deleteFoodsSuccess(response.data));
                dispatch(getAllFoods());
            })
            .catch(error => {
                dispatch(deleteFoodsFail());
            });
    }
}
