const ListsState = {
    lists : []
}

const ListReducers = ( state = ListsState, action ) =>
{
    switch(action.type)
    {
        default:
            return state;
    }

}

export default ListReducers;