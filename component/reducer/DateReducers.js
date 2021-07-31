const DateState = {
    DateSelected : new Date( Date.parse(new Date()) )
}

const DateReducers = ( state=DateState, action ) =>
{
    switch(action.type)
    {
        case 'SET_DATE_SELECTED':
            console.log('SET_DATE_SELECTED >>> ',action.payload)
            return {
                ...state,
                DateSelected:action.payload
            }
        default: 
            return state;
    }
}

export default DateReducers;