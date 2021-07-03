import React, { useState } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PeriodDisplay = () =>
{
    const [selected,setSelected] = useState('Daily');
    
    const backgroundColor = (period)=>
    {
        if( period === selected )
            return 'red'
        return 'black';
    }

    return (
        <View style={style.ScopeArea}>
            <TouchableHighlight style={[{backgroundColor:backgroundColor('Daily'),width:'33%'},style.Items]} onPress={()=>setSelected('Daily')} >
                <Text style={{color:'white'}}>Daily</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[{backgroundColor:backgroundColor('Weekly'),width:'34%'},style.Items]} onPress={()=>setSelected('Weekly')}>
                <Text style={{color:'white'}}>Weekly</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[{backgroundColor:backgroundColor('Monthly'),width:'33%'},style.Items]} onPress={()=>setSelected('Monthly')}>
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