import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import DisplayTypeLedgerModal from './DisplayTypeLedgerModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';

const DummyLedgerList = (props) =>
{

    const LedgerState = useSelector(state=>state.Ledger)
    const dispatch = useDispatch()

    return (
        <View style={{marginLeft:'10%',flexDirection:'row',alignItems:'center'}}>
            <TextInput style={{paddingLeft:'5%',minWidth:'60%',maxWidth:'80%',borderWidth:1,marginRight:'2%'}}/>
            <TouchableOpacity onPress={()=>props.setTypeModal(true)}>
                <Icon name={'list'} size={30} solid color="black" ></Icon>
            </TouchableOpacity>
            <View style={{flex:0.2}}></View>
            <Icon name={'save'} size={30} solid color="green" ></Icon>
            <View style={{flex:0.2}}></View>
            <TouchableOpacity onPress={()=>{
                    //delete props.data.temp;
                    dispatch({ type:'SET_TEMP_LEDGER',payload:{} })
                    dispatch({ type:'SET_LEDGER_COMPONENT',payload:{...LedgerState.component} })
                    props.setLockRecord(false);
                }}>
                <Icon name={'times'} size={30} solid color="red" ></Icon>
            </TouchableOpacity>
            <DisplayTypeLedgerModal typeModal={props.typeModal} setTypeModal={props.setTypeModal} />
        </View>
    )
}

export default DummyLedgerList;