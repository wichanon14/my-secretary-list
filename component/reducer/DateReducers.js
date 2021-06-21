const DateState = {
    DateSelected : new Date()
}

const DateReducers = ( state=DateState, action ) =>
{
    switch(action.type)
    {
        case 'SET_DATE_SELECTED':
            return {
                ...state,
                DateSelected:action.payload
            }
        default: 
            return state;
    }
}

export default DateReducers;