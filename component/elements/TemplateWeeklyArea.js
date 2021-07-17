import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { AddTemplate, EditTemplate, DeleteTemplate } from '../database'

const TemplateWeeklyArea = (props)=>
{

    const [ periodStore, setPeriodStore ] = useState((props.edit)?JSON.parse(props.data.period):[])
    const [ task_name, setTaskName ] = useState((props.edit)?props.data.task_name:null)
    const [ emptyTaskWarning, setEmptyTaskWarning ] = useState(false)
    const [ emptyPeriodWarning, setEmptyPeriodWarning ] = useState(false)
    const db = useSelector(state=>state.database.connection)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(task_name)
            setEmptyTaskWarning(false)
        if(periodStore && periodStore.length>0)
            setEmptyPeriodWarning(false)
    },[task_name,periodStore])

    const createWeeklyTemplate = ()=>
    {
        if( task_name && periodStore.length > 0 )
        {
            let data = {
                task_name:task_name,
                type:'weekly',
                period:JSON.stringify(periodStore),
            }
            AddTemplate(db,data,dispatch,props.setShow)
        }
        else
        {
            if( !task_name )
            {
                setEmptyTaskWarning(true)
            }
            else
            {
                setEmptyPeriodWarning(true)
            }
        }
    }

    const addDayOfWeek = (day)=>{

        let index = periodStore.findIndex((val)=>val.day===day)
        let newStore = periodStore
        if(index>=0)
            newStore.splice(index,1);
        else
            newStore.push({day:day})
        
        setPeriodStore([...newStore]);

    }

    const renderSelectedIcon = (day)=>
    {
        let index = periodStore.findIndex((val)=>val.day===day)

        if(index>=0)
            return 'check-square'
        else
            return 'square'
    }

    const renderCreateButton = ()=>
    {
        console.log('edit >>> ',props.edit,props.data)
        if(!props.edit)
            return (
                <TouchableOpacity style={style.createTaskButton} onPress={()=>createWeeklyTemplate()}>
                    <Text style={{color:'white',fontSize:20}}>CREATE</Text>
                </TouchableOpacity>
            )
        
        return (
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-around'}}>
                <TouchableOpacity style={[style.EditButton,{backgroundColor:'black'}]} onPress={()=>updateWeeklyTemplate()}>
                    <Text style={{color:'white',fontSize:20}}>UPDATE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.EditButton,{backgroundColor:'red'}]} onPress={()=>DeleteTemplate(db,props.data,dispatch,props.setShow)}>
                    <Text style={{color:'white',fontSize:20}}>DELETE</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const updateWeeklyTemplate = ()=>
    {
        if( task_name && periodStore.length > 0 )
        {
            let data = props.data;
            data.task_name = task_name;
            data.period = JSON.stringify(periodStore);
            EditTemplate(db,data,dispatch,props.setShow)
        }
        else
        {
            if( !task_name )
            {
                setEmptyTaskWarning(true)
            }
            else
            {
                setEmptyPeriodWarning(true)
            }
        }
    }

    return (
        <View style={style.modalArea}>

            <View style={style.topicArea}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>WEEKLY TEMPLATE</Text>
            </View>
            <View style={{minHeight:20}}></View>
            <TextInput height={50} placeholder="Task Name" onChangeText={(e)=>setTaskName(e)}
                style={style.taskInput} value={task_name}/>
            <View style={{height:'10%',marginLeft:'10%',flexDirection:'row',
                alignItems:'center'}}>
                <TouchableOpacity onPress={()=>addDayOfWeek(1)}>
                    <Text style={{marginLeft:'2%',fontSize:15}}>
                        <Icon name={renderSelectedIcon(1)} size={20} regular color="black" />  S
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>addDayOfWeek(2)}>
                    <Text style={{marginLeft:'2%',fontSize:15}}>
                        <Icon name={renderSelectedIcon(2)} size={20} regular color="black" />  M
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>addDayOfWeek(3)}>
                    <Text style={{marginLeft:'2%',fontSize:15}}>
                        <Icon name={renderSelectedIcon(3)} size={20} regular color="black" />  T
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>addDayOfWeek(4)}>
                    <Text style={{marginLeft:'2%',fontSize:15}}>
                        <Icon name={renderSelectedIcon(4)} size={20} regular color="black" />  W
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>addDayOfWeek(5)}>
                    <Text style={{marginLeft:'2%',fontSize:15}}>
                        <Icon name={renderSelectedIcon(5)} size={20} regular color="black" />  Th
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>addDayOfWeek(6)}>
                    <Text style={{marginLeft:'2%',fontSize:15}}>
                        <Icon name={renderSelectedIcon(6)} size={20} regular color="black" />  F
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>addDayOfWeek(7)}>
                    <Text style={{marginLeft:'2%',fontSize:15}}>
                        <Icon name={renderSelectedIcon(7)} size={20} regular color="black" />  Sa
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{maxHeight:30,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                {
                    emptyTaskWarning && <Text style={{color:'red'}}>Can't create empty task.</Text>
                }
                {
                    emptyPeriodWarning && <Text style={{color:'red'}}>Can't create task on non-selected day.</Text>
                }
            </View>
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
        height:'50%',
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

export default TemplateWeeklyArea;