import types from './types'

const INITIAL_STATE = {
	plantsList: [],
}

const plantsReducer = (state = INITIAL_STATE, action) => {
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
