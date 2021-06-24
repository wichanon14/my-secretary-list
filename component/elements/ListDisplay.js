import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import TaskCard from './TaskCard';
import { toyyyyMMDD } from '../central';

const ListDisplay = ()=>{

    const dateOpt = useSelector(state=>state.DateOpt)
    const tasklists = useSelector(state=>state.Lists)

    return (
        <View style={style.ListArea}>
            <ScrollView style={{flex:1}}>
                {
                    tasklists.lists.filter((val)=>toyyyyMMDD(val.date)===toyyyyMMDD(dateOpt.DateSelected)).map((val,i)=>
                        <TaskCard message={val.task_name} key={"task_"+i}/>    
                    )
                }
                <View style={{minHeight:30}}></View>
            </ScrollView>
        </View>
    )


}

const style = StyleSheet.create({
    ListArea:{
        minHeight:'57%',
        maxHeight:'57%',
        backgroundColor:"#d6d6d6"
    }
})


export default ListDisplay;