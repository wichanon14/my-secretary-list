import { useSelector } from "react-redux";

const ListsState = {
    lists : []
}

/**
 {
    "id":1, 
    "date":"2021-06-24",
    "task_name":"Exercise",
    "complete":false,
    "create_at":,
    "update_at":,
 }
 */

const ListReducers = ( state = ListsState, action ) =>
{
    switch(action.type)
    {
        case "SET_TASK_LIST":
            return {
                ...state,
                lists:action.payload
            }
        default:
            return state;
    }

}

export default ListReducers;