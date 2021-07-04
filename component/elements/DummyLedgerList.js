import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import DisplayTypeLedgerModal from './DisplayTypeLedgerModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import LedgerTextOnlyInput from './LedgerTextOnlyInput';
import LedgerTextAndAmountInput from './LedgerTextAndAmountInput';
import LedgerTextAndSumResultInput from './LedgerTextAndSumResultInput';
import LedgerTextAndPaidAmountAndLimit from './LedgerTextAndPaidAmountAndLimit';

const DummyLedgerList = (props) =>
{

    const LedgerState = useSelector(state=>state.Ledger)
    const dispatch = useDispatch()

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

    const CancelLedgerListInput = ()=>
    {
        props.RemoveTempRecord(props.component)
        dispatch({ type:'SET_TEMP_LEDGER',payload:{} })
        dispatch({ type:'SET_LEDGER_COMPONENT',payload:{...LedgerState.component} })
        props.setLockRecord(false);
    }

    const SaveLedgerListInput = ()=>
    {
        props.RemoveTempRecord(props.component)
        delete LedgerState.temp.temp;
        props.parentList.child.push(LedgerState.temp)
        dispatch({ type:'SET_TEMP_LEDGER',payload:{} })
        dispatch({ type:'SET_LEDGER_COMPONENT',payload:{...LedgerState.component} })
        props.setLockRecord(false);
    }

    return (
        <View style={{marginLeft:'5%',flexDirection:'row',alignItems:'center'}}>
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