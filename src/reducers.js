import { combineReducers } from 'redux'
import plantsReducer from './app/plants/duck'

const rootReducer = combineReducers({
  plants: plantsReducer
})

export default rootReducer
