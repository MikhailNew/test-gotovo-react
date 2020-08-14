import {RESET_DISH_CREATION, CREATE_DISH} from '../actions/actionsType'

const initialState = {
    dish: null
}

export default function createReducer(state = initialState, actions) {
    switch (actions.type) {
        case CREATE_DISH:
            return {
                ...state, 
                dish: actions.item
            }
        case RESET_DISH_CREATION:
            return {
                ...state, dish: []
            }    
        default:
            return state
    }
}