import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, ToastAndroid, TouchableOpacity, ScrollView } from 'react-native'
import HomeHeader from '../elements/HomeHeader';
import EmptyComponent from '../elements/EmptyComponent';
import CreateSingleTextModal from '../elements/CreateSingleTextModal';
import TopicLedger from '../elements/TopicLedger';
import DummyLedgerList from '../elements/DummyLedgerList';
import { useDispatch, useSelector } from 'react-redux';
import { setLedgerComponent, setTmpLedger } from '../action';
import LedgerRowType1 from '../elements/LedgerRowType1';
import LedgerRowType2 from '../elements/LedgerRowType2';
import LedgerRowType3 from '../elements/LedgerRowType3';
import LedgerRowType4 from '../elements/LedgerRowType4';
import LedgerRowType5 from '../elements/LedgerRowType5';
import { sumValueFromChild } from '../central';
import { AddLedgerRow, UpdateLedgerRow } from '../database';
import DisplayTypeLedgerModal from '../elements/DisplayTypeLedgerModal';

const Ledger = (props) =>
{
    const ledgerState = useSelector(state=>state.Ledger);
    const dispatch = useDispatch();
    const [ component, setComponent ] = useState(ledgerState.component)
    const [ componentName, setComponentName ] = useState(()=>{
        if(ledgerState && ledgerState.component && ledgerState.component.title )
            return ledgerState.component.title
        return null;
    });
    const db = useSelector(state=>state.database.connection);
    const [ scrollTo, setScrollTo ] = useState(0);
    const refScroll = useRef(null);


    // Modal flag
    const [ firstTopicModal, createFirstTopicModal ] = useState(false)
    const [ lockCreateRecord,setLockCreateRecord ] = useState(false);
    const [ popupCalendar, setPopupCalendar] = useState(false);
    const [ typeModal, setTypeModal ] = useState(false);

    useEffect(()=>{
        setComponent({...ledgerState.component});
        Recalculate(component)
    },[ledgerState.component])

    const scrollHandler = () => {
        
        if( refScroll )
        {
            refScroll.current.scrollTo({
                y: scrollTo,
                animated: true,
            });
        }
        
      };

    const Recalculate = (parent)=>
    {
        if( parent && parent.child && parent.child.length > 0)
        {
            parent.child.forEach((val)=>{
                Recalculate(val);
            })
            if(parent.type === 3)
            {
                sumValueFromChild(parent)
            }
        }
    }

    const createFirstTopic = () =>
    {
        if( component.id > 0 )
        {
            let existcomp = component;
            existcomp.title = componentName;
            UpdateLedgerRow(db,null,existcomp,dispatch);
        }
        else
        {
            let data = {
                id:0,
                title:componentName,
                type:1,
                level:0,
                value:0,
                limit:-1,
                child:[],
                includeCalculate:0,
                targetDate:Date.parse(new Date())
            }
            AddLedgerRow(db,null,data,dispatch)
        }
        
        
    }

    const AddNewData = (parent)=>
    {
        if( !lockCreateRecord )
        {    
            let data = {
                id:0,
                title:null,
                type:parent.type,
                level:parent.level+1,
                value:0,
                limit:-1,
                child:[],
                includeCalculate:false,
                targetDate:Date.parse(new Date()),
                temp:true
            }

            dispatch(setTmpLedger(data));
            parent.child.push(data);
            setLockCreateRecord(true);
        }
        else
        {
            ToastAndroid.show("Sorry!, We not support create multiple records.",ToastAndroid.SHORT);
        }

        return parent;
    }

    const RemoveTempRecord = (parent)=>
    {

        if( parent && parent.child && parent.child.length > 0 )
        {
            let found_index = -1;

            for(let i=0;i<parent.child.length;i++)
            {
                if( parent.type === 3 ){
                    sumValueFromChild(parent);
                }

                if( parent.child[i].temp || parent.child[i].temp === false )
                {
                    found_index = i;
                    break;
                }
                else
                {
                    RemoveTempRecord(parent.child[i]);
                }
            }

            if(found_index > -1)
            {
                parent.child.splice(found_index,1);
            }

        }

    }

    const editable = (data)=>
    {
        setLockCreateRecord(true);
        data.temp = true;
        dispatch( setTmpLedger(data) );
    }

    const renderRows = (parent,val,i)=>
    {
        if(val.temp)
        {
            return (
                <DummyLedgerList component={component} key={val.title+'_'+i} setLockRecord={setLockCreateRecord} RemoveTempRecord={RemoveTempRecord}
                    popupCalendar={popupCalendar} setPopupCalendar={setPopupCalendar}
                    typeModal={typeModal} setTypeModal={setTypeModal}
                    parentList={parent} isLock={lockCreateRecord}
                    setScrollTo={setScrollTo}
                    scrollTo={scrollHandler}
                    />
            )
        }
        else
        {

            switch(val.type)
            {
                case 1:
                    // Text
                    return [
                        <LedgerRowType1 key={val.title+'_'+i} data={val} isLock={lockCreateRecord} AddNewData={AddNewData} edit={editable} setTypeModal={setTypeModal}/>,
                        val.child.map((v,i)=>renderRows(val,v,i))
                    ]
                case 2:
                    // Text and Amount
                    return [
                        <LedgerRowType2 key={val.title+'_'+i} data={val} isLock={lockCreateRecord} AddNewData={AddNewData} edit={editable} setTypeModal={setTypeModal}/>,
                        val.child.map((v,i)=>renderRows(val,v,i))
                    ]
                case 3:
                    // Text and Sum
                    return [
                        <LedgerRowType3 key={val.title+'_'+i} data={val} isLock={lockCreateRecord} AddNewData={AddNewData} edit={editable} setTypeModal={setTypeModal}/>,
                        val.child.map((v,i)=>renderRows(val,v,i))
                    ]
                case 4:
                    // Date and Sum
                    return [
                        <LedgerRowType4 key={val.title+'_'+i} data={val} isLock={lockCreateRecord} AddNewData={AddNewData} edit={editable} setTypeModal={setTypeModal}/>,
                        val.child.map((v,i)=>renderRows(val,v,i))
                    ]
                case 5:
                    // Text, Offer and limit sum
                    return [
                        <LedgerRowType5 key={val.title+'_'+i} data={val} isLock={lockCreateRecord} AddNewData={AddNewData} edit={editable} setTypeModal={setTypeModal}/>,
                        val.child.map((v,i)=>renderRows(val,v,i))
                    ]
                default:
                    return <View key={val.title+'_'+i}></View>
            }
        }

    }

    const initialScreen = ()=>
    {
        if(JSON.stringify(component) === "{}")
            return (
                [
                    <EmptyComponent key={"emp_1"} setModal={createFirstTopicModal} show={firstTopicModal} />,
                    <CreateSingleTextModal key={"emp_2"} display={firstTopicModal} createText={createFirstTopic} setDisplay={createFirstTopicModal} text={componentName} setText={setComponentName} />
                ]
            )
        else
            return (
                <View style={{flex:1}}>
                    {/* Topic */}
                    <TopicLedger 
                        createFirstTopicModal={createFirstTopicModal}
                        component={component}
                        AddNewForm={AddNewData}
                        setComponent={setComponent}
                        isLock={lockCreateRecord}
                        setTypeModal={setTypeModal}
                    />

                    {/* Layer Data */}
                    {
                        component.child.map((val,i)=>renderRows(component,val,i))
                    }
                    <CreateSingleTextModal display={firstTopicModal} createText={createFirstTopic} 
                        setDisplay={createFirstTopicModal} 
                        text={(componentName)?componentName:ledgerState.component.title} setText={setComponentName} />
                    <DisplayTypeLedgerModal otherState={setPopupCalendar} typeModal={typeModal} setTypeModal={setTypeModal} />
                </View>
            )
    }

    return (
        <View style={style.MainArea}>
            <HomeHeader />
            {
                (component && component.title)?(
                    <ScrollView style={{flex:1,minHeight:'80%',maxHeight:'90%'}} 
                        ref={refScroll}
                    >
                        {initialScreen()}
                        <View style={{minHeight:200,maxHeight:200}}></View>
                    </ScrollView>            
                ):initialScreen()
            }
            
        </View>
    )
}

const style = StyleSheet.create({
    MainArea:{
        flexDirection:'column',
        flex:1,
        minHeight:'100%',
        maxHeight:'100%',
        marginTop:'7%'
    }
})

export default Ledger;