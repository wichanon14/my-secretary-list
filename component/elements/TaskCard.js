import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const TaskCard = (props) =>
{
    const [check,setCheck] = useState(false)
    const [iconName,setIconName] = useState("circle");

    useEffect(()=>{
        if(check)
            setIconName("check-circle")
        else
            setIconName("circle")
    },[check])


    return(
        <TouchableOpacity onPress={()=>setCheck(!check)}
            style={style.CardArea}>
            <Icon name={iconName} regular size={20} color="black" >
                <View style={{width:10}}></View>
                <Text style={style.Message}>{props.message}</Text>
            </Icon>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    CardArea:{
        borderWidth:1,
        minHeight:60,
        width:'80%',
        borderRadius:15,
        marginLeft:'10%',
        marginTop:'5%',
        justifyContent:'center',
        padding:'5%'
    },
    Message:{
        fontSize:15,
        flexWrap:'wrap'
    }
})

export default TaskCard;