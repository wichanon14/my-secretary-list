import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TemplateWeeklyArea = (props)=>
{

    const [ periodStore, setPeriodStore ] = useState([])

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

    return (
        <View style={style.modalArea}>

            <View style={style.topicArea}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>WEEKLY TEMPLATE</Text>
            </View>
            <View style={{minHeight:20}}></View>
            <TextInput height={50} placeholder="Task Name" style={style.taskInput}/>
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