import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { sumValueFromChild } from '../central';

const LedgerRowType5 = (props)=>
{
    const LedgerState = useSelector(state=>state.Ledger)
    const dispatch = useDispatch();

    return (
        <View style={{flexDirection:'row',alignItems:'center',
            marginLeft:(10*props.data.level)+'%',minWidth:'50%',marginBottom:'3%'}}>
            <TouchableOpacity onLongPress={()=>props.edit(props.data)}>
                <Text style={{fontSize:15,fontWeight:(props.data.level<2)?'bold':'normal'}}>
                    {props.data.title} {props.data.value}/{props.data.limit} ( { }
                    <Text style={{color:(props.data.limit-props.data.value>0)?'green':(props.data.limit-props.data.value)===0?'black':'red'}}> 
                        {(props.data.limit-props.data.value>0)?'+'+(props.data.limit-props.data.value):props.data.limit-props.data.value}
                    </Text>
                    { } 
                    )
                </Text>
            </TouchableOpacity>
            {
                (!props.isLock) && 
                <TouchableOpacity style={{marginLeft:'2%'}} 
                    onPress={()=>{
                        props.AddNewData(props.data);
                        dispatch({ type:'SET_LEDGER_COMPONENT',payload:{...LedgerState.component} })
                    }}>
                    <Icon name={'plus-square'} regular size={20} color="black" ></Icon>
                </TouchableOpacity>
            }
        </View>
    )
}

export default LedgerRowType5;