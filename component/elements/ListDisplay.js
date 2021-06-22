import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import TaskCard from './TaskCard';

const ListDisplay = ()=>{

    return (
        <View style={style.ListArea}>
            <ScrollView style={{flex:1}}>
                <TaskCard message={"Workout"} />
                <TaskCard message={"ล้างหน้าตอนเช้า"} />
                <TaskCard message={"ทำบัญชีรายรับรายจ่าย"} />
                <TaskCard message={"ทาครีมก่อนนอน"} />
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