import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { AddTemplate, EditTemplate, DeleteTemplate } from '../database';

const TemplateDailyArea = (props)=>
{

    const [ task_name, setTaskName ] = useState((props.edit)?props.data.task_name:null)
    const [ displayWarning, setDisplayWarning ] = useState(false)
    const db = useSelector(state=>state.database.connection)
    const dispatch = useDispatch()
    const template = useSelector(state=>state.Template)

    useEffect(()=>{
        if(task_name && task_name.length > 0 && task_name.trim() )   
            setDisplayWarning(false)
    },[task_name])

    useEffect(()=>{
        
    },[template.daily_template])

    const createDailyTemplate = ()=>
    {
        if(task_name)
        {
            let data = {
                task_name:task_name,
                type:'daily',
                period:'',
            }
            AddTemplate(db,data,dispatch,props.setShow)
        }
        else
        {
            setDisplayWarning(true)
        }
    }

    const renderCreateButton = ()=>
    {
        console.log('edit >>> ',props.edit,props.data)
        if(!props.edit)
            return (
                <TouchableOpacity style={style.createTaskButton} onPress={()=>createDailyTemplate()}>
                    <Text style={{color:'white',fontSize:20}}>CREATE</Text>
                </TouchableOpacity>
            )
        
        return (
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-around'}}>
                <TouchableOpacity style={[style.EditButton,{backgroundColor:'black'}]} onPress={()=>updateDailyTemplate()}>
                    <Text style={{color:'white',fontSize:20}}>UPDATE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.EditButton,{backgroundColor:'red'}]} onPress={()=>DeleteTemplate(db,props.data,dispatch,props.setShow)}>
                    <Text style={{color:'white',fontSize:20}}>DELETE</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const updateDailyTemplate = ()=>
    {
        if(task_name)
        {
            let data = props.data;
            data.task_name = task_name;
            EditTemplate(db,data,dispatch,props.setShow)
        }
        else
        {
            setDisplayWarning(true)
        }
    }

    return (
        <View style={style.modalArea}>
            <View style={style.topicArea}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>DAILY TEMPLATE</Text>
            </View>
            
            <View style={{flex:0.3}}></View>

            <TextInput height={50} placeholder="Task Name" value={task_name}
                style={style.taskInput} onChangeText={(e)=>setTaskName(e)}/>
            {
                (displayWarning)&&<View style={{width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'red'}}>Sorry, We can not create empty template.</Text>
                </View>
            }
            {
                renderCreateButton()
            }
            
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
    EditButton:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%',
        height:'50%',
        width:'40%',
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