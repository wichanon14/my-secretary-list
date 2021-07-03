import { combineReducers } from 'redux'
import ListReducers from './ListReducers'
import DateReducers from './DateReducers'
import { DatabaseReducer } from '../database'
import LedgerReducer from './LedgerReducer';

const rootReducers = combineReducers({
    Lists : ListReducers,
    DateOpt : DateReducers,
    database : DatabaseReducer,
    Ledger : LedgerReducer
})

export default rootReducers;