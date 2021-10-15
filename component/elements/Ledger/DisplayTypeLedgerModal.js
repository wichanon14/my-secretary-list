import React, { useEffect, useState } from 'react';
import { View,Modal,Text, TouchableOpacity, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LedgerType from './LedgerType';

const DisplayTypeLedgerModal = (props) =>
{
    const dispatch = useDispatch();
    const LedgerState = useSelector(state=>state.Ledger);
    const [ defaultType, setDefaultType ] = useState();

    useEffect(()=>{
        if(LedgerState.temp && LedgerState.temp.type)
        {
            setDefaultType(LedgerState.temp.type)
        }
    },[LedgerState.temp])

    const updateLedgerType = (type)=>
    {
        if(LedgerState.temp)
        {
            dispatch({
                type:'SET_TEMP_LEDGER',
                payload:{...LedgerState.temp,type:type}
            })
        }

        if(type === 4)
        {
            props.otherState(true)
        }

        props.setTypeModal(false)
    }

    return (
        <Modal animationType={'fade'} transparent={true} visible={props.typeModal} onRequestClose={()=>props.setTypeModal(false)}>
            <View style={{minHeight:'100%',minWidth:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.8)'}}>
                <TouchableOpacity style={{minHeight:'15%',width:'100%'}} onPress={()=>props.setTypeModal(false)}></TouchableOpacity>
                <View style={{minHeight:'60%',width:'80%',backgroundColor:'white',borderWidth:1,borderRadius:30}}>
                    <View style={{minHeight:'10%',borderBottomWidth:1,justifyContent:'center',backgroundColor:'black',borderTopLeftRadius:20,borderTopRightRadius:20}}>
                        <Text style={{fontSize:30,fontWeight:'bold',marginLeft:'10%',color:'white'}}>
                            Display Type
                        </Text>
                    </View>
                    <View style={{minHeight:'45%',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>updateLedgerType(1)}>
                            <LedgerType text={'title'} selected={defaultType===1} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>updateLedgerType(2)}>
                            <LedgerType text={'title -100 =>Amout'} selected={defaultType===2} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>updateLedgerType(3)}>
                            <LedgerType text={'title (+100) =>Sum'} selected={defaultType===3} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>updateLedgerType(4)} >
                            <LedgerType text={'date (+100) =>Sum'} selected={defaultType===4} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>updateLedgerType(5)} >
                            <LedgerType text={'title 100/150 (+50)'} selected={defaultType===5} />
                        </TouchableOpacity>

                    </View>
                </View>
                <TouchableOpacity style={{minHeight:'15%',width:'100%'}} onPress={()=>props.setTypeModal(false)}></TouchableOpacity>
            </View>
        </Modal>
    )
}

export default DisplayTypeLedgerModal;