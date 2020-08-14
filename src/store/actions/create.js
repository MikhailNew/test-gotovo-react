import {CREATE_DISH, RESET_DISH_CREATION} from './actionsType'
import Axios from 'axios';

export function createDish (item) {
    return {
        type: CREATE_DISH,
        item
    }
}

export function resetDishCreation () {
    return {
        type: RESET_DISH_CREATION
    }
}

export function finishCreateDish () {
    return async (dispatch, getState) => {
        await Axios.post('https://gotovo-db.firebaseio.com/dishes.json', getState().create.dish)
        dispatch(resetDishCreation())
    }
}