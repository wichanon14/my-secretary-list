import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { sumValueFromChild } from '../central';

const LedgerRowType4 = (props)=>
{
    const LedgerState = useSelector(state=>state.Ledger)
    const dispatch = useDispatch();

    return (
        <View style={{flexDirection:'row',alignItems:'center',
            marginLeft:(10*props.data.level)+'%',minWidth:'50%',marginBottom:'3%'}}>
            <TouchableOpacity onLongPress={()=>props.edit(props.data)}>
                <Text style={{fontSize:15,fontWeight:(props.data.level<2)?'bold':'normal'}}>
                    {props.data.title} ( { }
                    <Text style={{color:(sumValueFromChild(props.data)>0)?'green':(sumValueFromChild(props.data)===0)?'black':'red'}}> 
                        {(sumValueFromChild(props.data)>0)?'+'+sumValueFromChild(props.data):sumValueFromChild(props.data)}
                    </Text>
                    { } )
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

export default LedgerRowType4;