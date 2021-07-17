const TemplateState = {
    template_tab:'daily',
    daily_template:[],
    weekly_template:[],
    monthly_template:[]
}

const TemplateReducer = (state = TemplateState, action ) =>
{

    switch(action.type)
    {
        case 'SET_TEMPLATE_TAB':
            return {
                ...state,
                template_tab:action.payload
            }
        case 'SET_DAILY_TEMPLATE':
            return {
                ...state,
                daily_template:action.payload
            }
        case 'SET_WEEKLY_TEMPLATE':
            return {
                ...state,
                weekly_template:action.payload
            }
        case 'SET_MONTHLY_TEMPLATE':
            return {
                ...state,
                monthly_template:action.payload
            }
        default: 
            return state;
    }

}

export default TemplateReducer;