import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import DisplayTypeLedgerModal from './DisplayTypeLedgerModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import LedgerTextOnlyInput from './LedgerTextOnlyInput';
import LedgerTextAndAmountInput from './LedgerTextAndAmountInput';
import LedgerTextAndSumResultInput from './LedgerTextAndSumResultInput';
import LedgerTextAndPaidAmountAndLimit from './LedgerTextAndPaidAmountAndLimit';
import { AddLedgerRow, DeleteLedgerRow, UpdateLedgerRow } from '../database';

const DummyLedgerList = (props) =>
{

    const LedgerState = useSelector(state=>state.Ledger)
    const dispatch = useDispatch()
    const db = useSelector(state=>state.database.connection);

    const RenderInputSection = (type)=>
    {
        switch(type)
        {
            case 1: 
                return (<LedgerTextOnlyInput />)
            case 2:
                return (<LedgerTextAndAmountInput />)
            case 3:
                return (<LedgerTextAndSumResultInput />)
            case 4:
                return (<LedgerTextAndPaidAmountAndLimit />)
            default:
                return (
                    <View></View>
                )
        }
    }

    const DeleteLedgerList = (data)=>
    {
        Alert.alert(
            "Warning","Are you sure?",
            [
                {
                    text:"Yes",
                    onPress:()=>DeleteLedgerRow(db,data,dispatch)
                },
                {
                    text:"No"
                }
            ]
        )
        
    }

    const CancelLedgerListInput = ()=>
    {
        if(LedgerState.temp && LedgerState.temp.id > 0)
        {
            DeleteLedgerList(LedgerState.temp);
        }
        else
        {
            props.RemoveTempRecord(props.component)
            dispatch({ type:'SET_TEMP_LEDGER',payload:{} })
            dispatch({ type:'SET_LEDGER_COMPONENT',payload:{...LedgerState.component} })
        }
        props.setLockRecord(false);
    }

    const SaveLedgerListInput = ()=>
    {
        if( LedgerState.temp.id > 0)
        {
            UpdateLedgerRow(db,LedgerState.temp.parent_id,LedgerState.temp,dispatch);
        }
        else
        {
            AddLedgerRow(db,props.parentList.id,LedgerState.temp,dispatch)
        }
        dispatch({ type:'SET_TEMP_LEDGER',payload:{} })
        props.setLockRecord(false);
    }

    const displayStyle = ()=>
    {
        if(props.isLock)
            return {display:'flex'}
        else
            return {display:'none'}
    }

    return (
        <View style={[{marginLeft:'5%',flexDirection:'row',alignItems:'center'},displayStyle()]}>
            {RenderInputSection(LedgerState.temp.type)}
            <TouchableOpacity onPress={()=>props.setTypeModal(true)}>
                <Icon name={'list'} size={30} solid color="black" ></Icon>
            </TouchableOpacity>
            <View style={{flex:0.2}}></View>
            <TouchableOpacity onPress={()=>SaveLedgerListInput()}>
                <Icon name={'save'} size={30} solid color="green" ></Icon>
            </TouchableOpacity>
            <View style={{flex:0.2}}></View>
            <TouchableOpacity onPress={()=>CancelLedgerListInput()}>
                <Icon name={'times'} size={30} solid color="red" ></Icon>
            </TouchableOpacity>
            <DisplayTypeLedgerModal typeModal={props.typeModal} setTypeModal={props.setTypeModal} />
        </View>
    )
}

export default DummyLedgerList;