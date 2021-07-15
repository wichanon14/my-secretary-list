import React, { useEffect, useState } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplateTab } from '../action'

const PeriodDisplay = () =>
{
    const [selected,setSelected] = useState('Daily');
    const dispatch = useDispatch();
    const template = useSelector(state=>state.Template);

    useEffect(()=>{
        setSelected(template.template_tab)
    },[template.template_tab])

    const backgroundColor = (period)=>
    {
        if( period === selected )
            return 'red'
        return 'black';
    }

    return (
        <View style={style.ScopeArea}>
            <TouchableHighlight style={[{backgroundColor:backgroundColor('Daily'),width:'33%'},style.Items]} onPress={()=>dispatch(setTemplateTab('Daily'))} >
                <Text style={{color:'white'}}>Daily</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[{backgroundColor:backgroundColor('Weekly'),width:'34%'},style.Items]} onPress={()=>dispatch(setTemplateTab('Weekly'))}>
                <Text style={{color:'white'}}>Weekly</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[{backgroundColor:backgroundColor('Monthly'),width:'33%'},style.Items]} onPress={()=>dispatch(setTemplateTab('Monthly'))}>
                <Text style={{color:'white'}}>Monthly</Text>
            </TouchableHighlight>
        </View>
    )
}

const style = StyleSheet.create({
    ScopeArea:{
        minHeight:'5%',
        maxHeight:'5%',
        flexDirection:'row'
    },
    Items:{
        justifyContent:'center',
        alignItems:'center'
    }
})


export default PeriodDisplay;