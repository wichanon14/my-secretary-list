import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import TemplateDailyArea from './TemplateDailyArea';
import TemplateMonthlyArea from './TemplateMonthlyArea';
import TemplateWeeklyArea from './TemplateWeeklyArea';

const TemplateCreateModal = (props)=>
{

    const template = useSelector(state=>state.Template)
    

    const renderModal = ()=>{

        switch(template.template_tab)
        {
            case 'daily':
                return (<TemplateDailyArea setShow={props.setShow} edit={props.edit} data={props.data}/>)
            case 'weekly':
                return (<TemplateWeeklyArea setShow={props.setShow} edit={props.edit} data={props.data}/>)
            case 'monthly':
                return (<TemplateMonthlyArea setShow={props.setShow} edit={props.edit} data={props.data}/>)
            default:
                return (<View></View>)
        }

    }

    const getBackDropHeight = ()=>
    {
        switch(template.template_tab)
        {
            case 'daily':
                return '50%'
            case 'weekly':
                return '50%'
            case 'monthly':
                return '30%'
            default:
                return '40%'
        }
    }

    return (
        <Modal visible={props.show} 
            animationType="slide" onRequestClose={()=>props.setShow(false)} 
            transparent={true}>
            <View style={style.backdropArea}>
                <TouchableOpacity style={{height:getBackDropHeight()}} activeOpacity={0.5} onPress={()=>props.setShow(false)}></TouchableOpacity>
                {renderModal()}
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

export default TemplateCreateModal;