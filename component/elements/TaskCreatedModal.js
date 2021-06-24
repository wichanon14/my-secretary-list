import React, { useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux';

const TaskCreatedModal = (props)=>
{
    const [ task, setTask ] = useState(null);
    const dispatch = useDispatch();

    const create_task = ()=>
    {
        let taskObj = {
            date:props.date,
            task_name:task
        }

        dispatch({type:"CREATE_TASK",payload:taskObj})
        props.setShow(false);
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
                    </View>

                    <TextInput height={50} style={style.dateDisplay} value={(props.date+'').substr(0,16)} editable={false}/>
                    
                    <TextInput height={50} onChangeText={setTask} value={task} placeholder="Task Name" style={style.taskInput}/>
                    
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
        marginTop:'4%',
        paddingLeft:20,
        paddingRight:20,
        borderWidth:1,
        borderRadius:20
    }
})

export default TaskCreatedModal;