import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid, TouchableOpacity, ScrollView } from 'react-native'
import HomeHeader from '../elements/HomeHeader';
import EmptyComponent from '../elements/EmptyComponent';
import CreateSingleTextModal from '../elements/CreateSingleTextModal';
import TopicLedger from '../elements/TopicLedger';
import DummyLedgerList from '../elements/DummyLedgerList';
import { useDispatch, useSelector } from 'react-redux';
import { setLedgerComponent, setTmpLedger } from '../action';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LedgerRowType1 from '../elements/LedgerRowType1';
import LedgerRowType2 from '../elements/LedgerRowType2';
import LedgerRowType3 from '../elements/LedgerRowType3';
import LedgerRowType4 from '../elements/LedgerRowType4';
import { sumValueFromChild } from '../central';

const Ledger = (props) =>
{
    const ledgerState = useSelector(state=>state.Ledger);
    const dispatch = useDispatch();
    const [ component, setComponent ] = useState(ledgerState.component)
    const [ componentName, setComponentName ] = useState(null);


    // Modal flag
    const [ firstTopicModal, createFirstTopicModal ] = useState(false)
    const [ lockCreateRecord,setLockCreateRecord ] = useState(false);
    const [ typeModal, setTypeModal ] = useState(false);

    useEffect(()=>{
        setComponent(ledgerState.component);
        Recalculate(component)
    },[ledgerState.component])

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
        let data = {
            id:0,
            title:componentName,
            type:1,
            level:0,
            value:0,
            child:[],
            includeCalculate:false
        }
        dispatch(setLedgerComponent(data));
    }

    const AddNewData = (parent)=>
    {
        if( !lockCreateRecord )
        {    
            let data = {
                id:parent.id+1,
                title:null,
                type:parent.type,
                level:parent.level+1,
                value:0,
                limit:-1,
                child:[],
                includeCalculate:false,
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

    const renderRows = (parent,val,i)=>
    {   
        if(val.temp)
        {
            return (
                <DummyLedgerList component={component} key={val.title+'_'+i} setTypeModal={setTypeModal} 
                    typeModal={typeModal} setLockRecord={setLockCreateRecord} RemoveTempRecord={RemoveTempRecord}
                    parentList={parent}
                    />
            )
        }
        else
        {
            switch(val.type)
            {
                case 1:
                    return [
                        <LedgerRowType1 key={val.title+'_'+i} data={val} isLock={lockCreateRecord} AddNewData={AddNewData}/>,
                        val.child.map((v,i)=>renderRows(val,v,i))
                    ]
                case 2:
                    return [
                        <LedgerRowType2 key={val.title+'_'+i} data={val} isLock={lockCreateRecord} AddNewData={AddNewData}/>,
                        val.child.map((v,i)=>renderRows(val,v,i))
                    ]
                case 3:
                    return [
                        <LedgerRowType3 key={val.title+'_'+i} data={val} isLock={lockCreateRecord} AddNewData={AddNewData}/>,
                        val.child.map((v,i)=>renderRows(val,v,i))
                    ]
                case 4:
                    return [
                        <LedgerRowType4 key={val.title+'_'+i} data={val} isLock={lockCreateRecord} AddNewData={AddNewData}/>,
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
                    {/* Layer 1 >>>> Topic */}
                    <TopicLedger 
                        createFirstTopicModal={createFirstTopicModal}
                        component={component}
                        AddNewForm={AddNewData}
                        setComponent={setComponent}
                        isLock={lockCreateRecord}
                    />

                    {/* Layer 2 */}
                    {
                        component.child.map((val,i)=>renderRows(component,val,i))
                    }
                    <CreateSingleTextModal display={firstTopicModal} createText={createFirstTopic} setDisplay={createFirstTopicModal} text={componentName} setText={setComponentName} />
                </View>
            )
    }

    const testCreate = (i)=>
    {
        if( i === 0)
            return (
                <Text>{i}</Text>
            )
        return [testCreate(i-1),<Text>{i}</Text>]
    }

    return (
        <View style={style.MainArea}>
            <HomeHeader />
            {
                (component && component.title)?(
                    <ScrollView style={{flex:1,minHeight:'80%',maxHeight:'90%'}}>
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