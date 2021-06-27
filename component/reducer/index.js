import { combineReducers } from 'redux'
import ListReducers from './ListReducers'
import DateReducers from './DateReducers'
import { DatabaseReducer } from '../database'

const rootReducers = combineReducers({
    Lists : ListReducers,
    DateOpt : DateReducers,
    database : DatabaseReducer
})

export default rootReducers;