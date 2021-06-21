
/* =============================== Date Operation =================================== */
export const setDateSelected = (data) =>
{
    return {
        type : "SET_DATE_SELECTED",
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