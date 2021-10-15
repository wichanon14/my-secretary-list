import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { toyyyyMMDD } from '../../central';
import { AddTask, UpdateTask } from "../../database";

const TaskCreatedModal = (props)=>
{
    const [ task, setTask ] = useState((props.data && props.data.task_name)?props.data.task_name:null);
    const [ displayWarning, setDisplayWarning ] = useState(false);
    const [ createOnTop, setCreateOnTop ] = useState(false);
    const dispatch = useDispatch();
    const db = useSelector(state=>state.database);

    useEffect(()=>{
        if(task && task.length>0)
            setDisplayWarning(false);
    },[task])

    const create_task = ()=>
    {
        
        if(task && task.length > 0)
        {

            // If it's a new task
            if(!props.data)
            {
                let taskObj = {
                    date:toyyyyMMDD(props.date),
                    task_name:task
                }
        
                AddTask(db.connection,taskObj,dispatch);
            }
            // else -> It's exists task -> edit task
            else
            {
                let taskObj = props.data;
                if(taskObj.task_name !== task)
                {
                    taskObj.task_name = task
                    UpdateTask(db.connection,taskObj,dispatch);
                }

            }
            props.setShow(false);

            
        }
        else
        {
            setDisplayWarning(true);
        }
        
    }

    

    return (
        <Modal visible={props.show} 
            animationType="fade" onRequestClose={()=>props.setShow(false)} 
            transparent={true}>

            <View style={style.backdropArea}>

                <TouchableOpacity style={{height:'40%'}} activeOpacity={0.5} onPress={()=>props.setShow(false)}></TouchableOpacity>
                
                <View style={style.modalArea}>

                    <View style={style.topicArea}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>CREATE TASK</Text>
                        {
                            createOnTop &&
                            <TouchableOpacity style={{marginLeft:'40%',width:'25%',backgroundColor:'black',padding:'2%',borderRadius:20}} onPress={create_task}>
                                <Text style={{color:'white',fontSize:10,textAlign:'center'}}>CREATE</Text>
                            </TouchableOpacity>
                        }
                    </View>

                    <TextInput height={50} style={style.dateDisplay} value={(props.date+'').substr(0,16)} editable={false}/>
                    
                    <TextInput height={50} onFocus={()=>setCreateOnTop(true)} onBlur={()=>setCreateOnTop(false)}
                        onChangeText={setTask} value={task} placeholder="Task Name" style={style.taskInput}/>
                    <View style={style.warningView}>
                        <Text style={style.warningMessage}>{(displayWarning)?"Can't not create empty task!":''}</Text>
                    </View>
                    
                    <TouchableOpacity style={style.createTaskButton} onPress={create_task}>
                        <Text style={{color:'white',fontSize:20}}>CREATE</Text>
                    </TouchableOpacity>
                    
                </View>

            </View>

        </Modal>
    )

}

const style = StyleSheet.create({
    backdropArea:{
        backgroundColor:'rgba(0,0,0,0.5)',
        height:'100%'
    },
    modalArea:{
        flex:1,
        height:'60%',
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
    dateDisplay:{
        color:'black',
        fontSize:18,
        marginLeft:'10%',
        marginTop:'8%',
        marginBottom:'2%',
        paddingLeft:10
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

export default TaskCreatedModal;