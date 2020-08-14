import Axios from "axios"
import {FEUCH_DISHES_ERROR, FETCH_DISHES_SUCCESS, FETCH_DISHES_START} from './actionsType'

export function fetchDishes () {
    return async dispatch => {
        dispatch(fetchDishesStart())
        try {
            const response = await Axios.get('https://gotovo-db.firebaseio.com/dishes.json')
            const dishes = {
                drink: {
                    cathegoria: 'drink',
                    title: 'Напитки',
                    dishList: []
                },
                hotDrink: {
                    cathegoria: 'hotDrink',
                    title: 'Горячие напитки',
                    dishList: []
                },
                soup: {
                    cathegoria: 'soup',
                    title: 'Супы',
                    dishList: []
                },
                salad: {
                    cathegoria: 'salad',
                    title: 'Салатики',
                    dishList: []
                },
                hot: {
                    cathegoria: 'hot',
                    title: 'Горячее',
                    dishList: []
                },
                breakfast: {
                    cathegoria: 'breakfast',
                    title: 'Завтраки',
                    dishList: []
                },
                sauce: {
                    cathegoria: 'sauce',
                    title: 'Соусы',
                    dishList: []
                },
                pastry: {
                    cathegoria: 'pastry',
                    title: 'Сладенькое',
                    dishList: []
                },
                garnish: {
                    cathegoria: 'garnish',
                    title: 'Гарниры',
                    dishList: []
                }
            }
            Object.keys(response.data).forEach(item => {
                const params = response.data[item]
                switch (params.cathegoria) {
                    case 'drink':
                        dishes.drink.dishList.push(params)
                        break;
                    case 'hotDrink':
                        dishes.hotDrink.dishList.push(params)
                        break;
                    case 'soup':
                        dishes.soup.dishList.push(params)
                        break;
                    case 'salad':
                        dishes.salad.dishList.push(params)
                        break;
                    case 'hot':
                        dishes.hot.dishList.push(params)
                        break;
                    case 'breakfast':
                        dishes.breakfast.dishList.push(params)
                        break;
                    case 'sauce':
                        dishes.sauce.dishList.push(params)
                        break;
                    case 'pastry':
                        dishes.pastry.dishList.push(params)
                        break;
                    case 'garnish':
                        dishes.garnish.dishList.push(params)
                        break;
                    default:
                        return;
                }
            })
            dispatch(fetchDishesSuccess(dishes))
        } catch (e) {
            dispatch(fetchDishesError(e))
        }
    }
}

export function fetchDishesStart() {
    return {
        type: FETCH_DISHES_START
    }
}

export function fetchDishesSuccess (dishes) {
    return {
        type: FETCH_DISHES_SUCCESS,
        dishes 
    }
}

export function fetchDishesError (e) {
    return {
        type: FEUCH_DISHES_ERROR,
        error: e
    }
}