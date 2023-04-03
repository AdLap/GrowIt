import types from './types'

const INITIAL_STATE = {
	name: 'plants',
	list: [],
}

const plantsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.GET_PLANTS:
			return console.log('get', state)

    case types.ADD_PLANTS:
      return {
        ...state, list: [...state.list, action.item]
      }

    default:
      return state
	}
}

export default plantsReducer
