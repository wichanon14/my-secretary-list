import { combineReducers } from 'redux'
import ListReducers from './ListReducers'
import DateReducers from './DateReducers'
import { DatabaseReducer } from '../database'
import LedgerReducer from './LedgerReducer';
import TemplateReducer from './TemplateReducer';

const rootReducers = combineReducers({
    Lists : ListReducers,
    DateOpt : DateReducers,
    database : DatabaseReducer,
    Ledger : LedgerReducer,
    Template : TemplateReducer
})

export default rootReducers;