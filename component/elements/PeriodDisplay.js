import React, { useEffect, useState } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplateTab } from '../action'
import { GetTemplate } from '../database'

const PeriodDisplay = () =>
{
    const [selected,setSelected] = useState('daily');
    const dispatch = useDispatch();
    const template = useSelector(state=>state.Template);
    const db = useSelector(state=>state.database.connection);

    useEffect(()=>{
        setSelected(template.template_tab)
    },[template.template_tab])

    const selectTemplateType = (type) =>
    {
        GetTemplate(db,type,dispatch);
        dispatch(setTemplateTab(type));

    }

    const backgroundColor = (period)=>
    {
        if( period === selected )
            return {
                backgroundColor:'black'
            }
        return {};
    }

    const textColor = (period)=>
    {
        if( period === selected )
            return 'white'
        return 'black';
    }

    return (
        <View style={style.ScopeArea}>
            <TouchableOpacity style={[backgroundColor('daily'),{width:'33%'},style.Items]} onPress={()=>selectTemplateType('daily')} >
                <Text style={{color:textColor('daily'),fontWeight:'bold'}}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[backgroundColor('weekly'),{width:'34%'},style.Items]} onPress={()=>selectTemplateType('weekly')}>
                <Text style={{color:textColor('weekly'),fontWeight:'bold'}}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[backgroundColor('monthly'),{width:'33%'},style.Items]} onPress={()=>selectTemplateType('monthly')}>
                <Text style={{color:textColor('monthly'),fontWeight:'bold'}}>Monthly</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    ScopeArea:{
        minHeight:'8%',
        maxHeight:'8%',
        flexDirection:'row',
        width:'95%',
        alignSelf:'center',
        //borderWidth:1,
        borderRadius:30,
        backgroundColor: '#f2f2f2'
    },
    Items:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
    }
})


export default PeriodDisplay;