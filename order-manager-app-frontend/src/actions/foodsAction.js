import * as actionTypes from './actionTypes';
import Api from '../services/api';

export function toggleAddEditForm(isOpenAddEditForm) {
    return {
        type: actionTypes.TOGGLE_FOODS_ADD_EDIT_FORM,
        payload: !isOpenAddEditForm
    }
}

export function getAllFoodsRequest() {
    return {
        type: actionTypes.FETCH_FOODS_REQUEST
    }
}

export function getAllFoodsSuccess(data) {
    return {
        type: actionTypes.FETCH_FOODS_SUCCESS,
        payload: data
    }
}

export function getAllFoodsFail() {
    return {
        type: actionTypes.FETCH_FOODS_FAIL,
    }
}

export function getAllFoods() {
    return dispatch => {
        dispatch(getAllFoodsRequest());
        Api.get('foods')
            .then(response => {
                dispatch(getAllFoodsSuccess(response.data));
            })
            .catch(error => {
               dispatch(getAllFoodsFail());
            });
    }
}
