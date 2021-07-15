/* =============================== Template Action =================================== */
export const setTemplateTab = (data) =>
{
    return {
        type: "SET_TEMPLATE_TAB",
        payload: data
    }
}


/* =============================== Ledger Action =================================== */
export const setLedgerComponent = (data) =>
{
    return {
        type: "SET_LEDGER_COMPONENT",
        payload: data
    }
}

export const setTmpLedger = (data) =>
{
    return {
        type: "SET_TEMP_LEDGER",
        payload:data
    }
}



/* =============================== Database Action =================================== */
export const setDatabase = (data) =>
{
    return {
        type : "SET_DATABASE_CONNECTION",
        payload : data
    }
}


/* =============================== Date Operation =================================== */
export const setDateSelected = (data) =>
{
    return {
        type : "SET_DATE_SELECTED",
        payload : data
    }
}

/* =============================== Task List Operation =================================== */
export const createTask = (data) =>
{
    return {
        type : "CREATE_TASK",
        payload : data
    }
}

export const setTasks = (data) =>
{
    return {
        type : "SET_TASK_LIST",
        payload : data
    }
}

/*
Example 
export const setMember = (data) =>{

    return {
        type: "SET_MEMBER",
        payload:data
    }

}

export const getAllMember = () =>{

    return (dispatch)=>{
        axios.get("http://localhost/the-pitch-battle/?action=GET_MEMBER")
        .then((data)=>{
            dispatch(setMember(data.data))
        });

    }

}*/