const ListsState = {
    lists : []
}

/**
 {
     "date":"2021-06-24",
     "task_name":"Exercise"
 }
 */

const ListReducers = ( state = ListsState, action ) =>
{
    switch(action.type)
    {
        case "CREATE_TASK":
            console.log(123);
            return {
                ...state,
                lists:[...state.lists,action.payload]
            }
        default:
            return state;
    }

}

export default ListReducers;