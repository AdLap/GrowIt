import types from './types'

const INITIAL_PLANTS_LIST = {
	plantsList: [],
}

const plantsReducer = (state = INITIAL_PLANTS_LIST, action) => {
	switch (action.type) {
		case types.ADD_PLANTS:
			return {
				...state,
				plantsList: [...state.plantsList, action.item],
			}

		default:
			return state
	}
}

export default plantsReducer
