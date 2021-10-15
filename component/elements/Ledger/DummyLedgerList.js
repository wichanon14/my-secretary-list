import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import LedgerTextOnlyInput from './LedgerTextOnlyInput';
import LedgerTextAndAmountInput from './LedgerTextAndAmountInput';
import LedgerTextAndSumResultInput from './LedgerTextAndSumResultInput';
import LedgerTextAndPaidAmountAndLimit from './LedgerTextAndPaidAmountAndLimit';
import CalendarSelectedModal from '../CalendarSelectedModal';
import { AddLedgerRow, DeleteLedgerRow, UpdateLedgerRow } from '../../database';
import { toyyyyMMDD } from '../../central'

const DummyLedgerList = (props) =>
{

    const LedgerState = useSelector(state=>state.Ledger)
    const dispatch = useDispatch()
    const db = useSelector(state=>state.database.connection);
    const [ dateSelected, setDateSelected ] = useState( null )

    useEffect(()=>{
        if(dateSelected)
        {
            let data = LedgerState.temp;
            data.targetDate=dateSelected;
            let date = new Date(dateSelected);
            let month = (date.getMonth()<9)?'0'+(date.getMonth()+1):(date.getMonth()+1);
            let day = (date.getDate()<10)?'0'+date.getDate():date.getDate();
            data.title=`${day}/${month}`;
            dispatch({
                type:'SET_TEMP_LEDGER',
                payload:data
            }
            );

            SaveLedgerListInput();

        }

    },[dateSelected])

    const RenderInputSection = (type)=>
    {
        switch(type)
        {
            case 1: 
                return (<LedgerTextOnlyInput scrollTo={props.scrollTo} />)
            case 2:
                return (<LedgerTextAndAmountInput scrollTo={props.scrollTo} />)
            case 3:
                return (<LedgerTextAndSumResultInput scrollTo={props.scrollTo} />)
            case 4:
                return [
                    <View key={'dummy_1'} style={{borderWidth:1,padding:'3%',minWidth:'50%',maxWidth:'70%',marginRight:'2%',borderRadius:20}}>
                        <Text style={{color:'rgba(0,0,0,0.5)'}}>{LedgerState.temp.title}</Text>
                    </View>,
                    <CalendarSelectedModal key={'dummy_2'}  popupCalendar={props.popupCalendar} setPopupCalendar={props.setPopupCalendar} 
                            setDateSelected={setDateSelected}/>
                ]
            case 5:
                return (<LedgerTextAndPaidAmountAndLimit scrollTo={props.scrollTo} />)
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
                    onPress:()=>{
                        DeleteLedgerRow(db,data,dispatch)
                    }
                },
                {
                    text:"No",
                    onPress:()=>{
                        props.parentList.child.forEach(element => {
                            if(element.temp)
                                delete element.temp;
                        });
                        props.RemoveTempRecord(props.component)
                        dispatch({ type:'SET_TEMP_LEDGER',payload:{} })
                    }
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
        <View style={[{marginLeft:'5%',flexDirection:'row',alignItems:'center'},displayStyle()]}
            onLayout={(event)=>{
                const layout = event.nativeEvent.layout;
                props.setScrollTo(layout.y);
            }}
            >
            {RenderInputSection(LedgerState.temp.type)} 
            <TouchableOpacity onPress={()=>{
                props.setTypeModal(true)
            }}>
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
        </View>
    )
}

export default DummyLedgerList;