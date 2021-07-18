const profileSetting = {
    StartLedgerPeriod: null,
    FinishLedgerPeriod: null
}

const ProfileReducer=( state=profileSetting, action )=>
{
    switch(action.type)
    {
        case 'SET_LEDGER_PERIOD':
            return {
                ...state,
                StartLedgerPeriod:action.payload.beginInterval,
                FinishLedgerPeriod:action.payload.finishInterval
            }
        default: return state;
    }
}

export default ProfileReducer;