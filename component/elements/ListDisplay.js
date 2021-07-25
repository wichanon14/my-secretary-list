import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import TaskCard from './TaskCard';
import { toyyyyMMDD } from '../central';

const ListDisplay = (props)=>{

    const dateOpt = useSelector(state=>state.DateOpt)
    const tasklists = useSelector(state=>state.Lists)
    const [ tasks,setTasks ] = useState(tasklists.lists)

    useEffect(()=>{
        setTasks(tasklists.lists)
    },[tasklists.lists])

    const style = StyleSheet.create({
        ListArea:{
            minHeight:props.height,
            maxHeight:props.height,
            backgroundColor:"#d6d6d6"
        }
    })

    return (
        <View style={style.ListArea}>
            <ScrollView style={{flex:1}}>
                {
                    tasks.filter(
                            (val)=>val.date===toyyyyMMDD(dateOpt.DateSelected)
                        ).map((val,i)=><TaskCard data={val} key={"task_"+i}/>    
                    )
                }
                <View style={{minHeight:30}}></View>
            </ScrollView>
        </View>
    )


}




export default ListDisplay;