const profileSetting = {
    StartLedgerPeriod: null,
    FinishLedgerPeriod: null
}

const ProfileReducer=( state=profileSetting, action )=>
{
    switch(action.type)
    {
        case 'SET_PROFILE_SETTING':
            return action.payload;
        default: return state;
    }
}

export default ProfileReducer;