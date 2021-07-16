import React from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'

const ListDisplay = (props)=>{

    const templates = useSelector(state=>state.Template)

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
                    /*tasklists.lists.filter(
                            (val)=>val.date===toyyyyMMDD(dateOpt.DateSelected)
                        ).map((val,i)=><TaskCard data={val} key={"task_"+i}/>    
                    )*/
                    templates.daily_template.map((val,i)=>(
                        <Text>{val.task_name}</Text>
                    ))
                }
                <View style={{minHeight:30}}></View>
            </ScrollView>
        </View>
    )


}




export default ListDisplay;