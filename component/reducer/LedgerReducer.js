const LedgerState = {
    component:{},
    temp:{}
}

const LedgerReducer = ( state=LedgerState, action ) =>
{
    switch(action.type)
    {
        case "SET_LEDGER_COMPONENT":
            return {
                ...state,
                component:action.payload
            }
        case "SET_TEMP_LEDGER":
            return {
                ...state,
                temp:action.payload
            }
        default:
            return state;
    }
}

export default LedgerReducer;