import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import TaskCard from './TaskCard';

const ListDisplay = ()=>{

    return (
        <View style={{minHeight:'57%',maxHeight:'57%',borderWidth:1}}>
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

export default ListDisplay;