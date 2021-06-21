import { combineReducers } from 'redux'
import ListReducers from './ListReducers'
import DateReducers from './DateReducers'

const rootReducers = combineReducers({
    Lists : ListReducers,
    DateOpt : DateReducers
})

export default rootReducers;