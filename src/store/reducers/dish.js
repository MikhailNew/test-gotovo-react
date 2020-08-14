import {FEUCH_DISHES_ERROR, FETCH_DISHES_SUCCESS, FETCH_DISHES_START} from '../actions/actionsType'

const initialState = {
    loading: true,
    dishes: [],
    error: null
}

export default function dishReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_DISHES_SUCCESS:
            return {
                ...state, loading: false, dishes: action.dishes
            }
        case FETCH_DISHES_START:
            return {
                ...state, loading: true
            }
        case FEUCH_DISHES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }    
        default:
            return state
    }
}