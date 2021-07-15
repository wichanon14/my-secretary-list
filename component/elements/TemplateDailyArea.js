import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'

const TemplateDailyArea = (props)=>
{
    return (
        <View style={style.modalArea}>
            <View style={style.topicArea}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>DAILY TEMPLATE</Text>
            </View>
            
            <View style={{flex:0.3}}></View>

            <TextInput height={50} placeholder="Task Name" style={style.taskInput}/>

            <TouchableOpacity style={style.createTaskButton}>
                <Text style={{color:'white',fontSize:20}}>CREATE</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const style = StyleSheet.create({
    backdropArea:{
        backgroundColor:'rgba(0,0,0,0.5)',
        height:'100%'
    },
    modalArea:{
        flex:1,
        minHeight:'50%',
        maxHeight:'50%',
        backgroundColor:'white',
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    topicArea:{
        padding:'5%',
        alignSelf:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderBottomWidth:1,
        width:'90%'
    },
    createTaskButton:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%',
        height:'15%',
        backgroundColor:'black',
        width:'80%',
        alignSelf:'center',
        borderRadius:10
    },
    taskInput:{
        margin:'10%',
        marginBottom:'5%',
        marginTop:'4%',
        paddingLeft:20,
        paddingRight:20,
        borderWidth:1,
        borderRadius:20
    },
    warningView:{
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
        marginBottom:'5%',
    },
    warningMessage:{
        color:'red'
    }
})

export default TemplateDailyArea