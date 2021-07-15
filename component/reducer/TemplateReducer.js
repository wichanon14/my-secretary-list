const TemplateState = {
    template_tab:'Daily',
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
        default: 
            return state;
    }

}

export default TemplateReducer;