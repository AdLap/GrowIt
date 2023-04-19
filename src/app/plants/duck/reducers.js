import types from './types'

export const initialPlant = {
	name: '',
	species: '',
	date: '',
	care: '',
	image: '',
	diary: [],
	id: '',
}

const INITIAL_PLANTS_LIST = {
	plantsList: [],
	currentPlant: {},
}

const plantsReducer = (state = INITIAL_PLANTS_LIST, action) => {
	switch (action.type) {
		case types.ADD_PLANTS:
			return {
				...state,
				plantsList: [...state.plantsList, action.item],
			}

		case types.ADD_CURRENT_PLANT:
			return {
				...state,
				currentPlant: { ...state.currentPlant, ...action.item },
			}

		case types.DELETE_PLANT:
			return {
				...state,
				plantsList: [
					...state.plantsList.filter((element) => element.id !== action.item),
				],
			}

		case types.EDIT_PLANT:
			const index = state.plantsList
				.map((element) => element.id)
				.indexOf(action.item.id)
			return {
				...state,
				plantsList: [
					...state.plantsList.slice(0, index),
					action.item,
					...state.plantsList.slice(index + 1),
				],
				currentPlant: { ...state.currentPlant, ...action.item },
			}

		case types.RESET_CURRENT_PLANT:
			return {
				...state,
				currentPlant: { ...state.currentPlant, ...initialPlant },
			}

		default:
			return state
	}
}

export default plantsReducer
