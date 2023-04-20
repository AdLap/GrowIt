import { combineReducers } from 'redux'
import plantsReducer from './plants/duck'

const rootReducer = combineReducers({
  plants: plantsReducer
})

export default rootReducer
