import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

const LedgerRowType1 = (props)=>
{
    const LedgerState = useSelector(state=>state.Ledger)
    const dispatch = useDispatch();

    return (
        <View style={{flexDirection:'row',alignItems:'center',
            marginLeft:(5*props.data.level)+'%',minWidth:'50%',marginBottom:'3%'}}>
            <TouchableOpacity onLongPress={()=>props.edit(props.data)}>
                <Text style={{flexWrap:'wrap',fontSize:15,fontWeight:(props.data.level<2)?'bold':'normal'}}>
                    {props.data.title}
                </Text>
            </TouchableOpacity>                
            {
                (!props.isLock) && 
                <TouchableOpacity style={{marginLeft:'2%'}} 
                    onPress={()=>{
                        props.setTypeModal(true);
                        props.AddNewData(props.data);
                        dispatch({ type:'SET_LEDGER_COMPONENT',payload:{...LedgerState.component} })
                        
                    }}>
                    <Icon name={'plus-square'} regular size={20} color="black" ></Icon>
                </TouchableOpacity>
            }
        </View>
    )
}

export default LedgerRowType1;