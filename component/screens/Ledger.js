import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native'
import HomeHeader from '../elements/HomeHeader';
import EmptyComponent from '../elements/EmptyComponent';
import CreateSingleTextModal from '../elements/CreateSingleTextModal';
import TopicLedger from '../elements/TopicLedger';
import DummyLedgerList from '../elements/DummyLedgerList';
import { useDispatch, useSelector } from 'react-redux';
import { setLedgerComponent, setTmpLedger } from '../action';

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
        console.log(component);
        setComponent(ledgerState.component);
    },[ledgerState.component])

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

    const AddNewForm = (parent)=>
    {
        if( !lockCreateRecord )
        {    
            let data = {
                id:parent.id+1,
                title:null,
                type:parent.type,
                level:parent.level+1,
                value:0,
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

    const renderRows = (parent,val,i)=>
    {   
        if(val.temp)
        {
            return (
                <DummyLedgerList data={val} key={val.title+'_'+i} setTypeModal={setTypeModal} 
                    typeModal={typeModal} setLockRecord={setLockCreateRecord} />
            )
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
                <View style={{flex:1,borderWidth:1}}>
                    {/* Layer 1 >>>> Topic */}
                    <TopicLedger 
                        createFirstTopicModal={createFirstTopicModal}
                        component={component}
                        AddNewForm={AddNewForm}
                        setComponent={setComponent}
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
        console.log(i);
        if( i === 0)
            return (
                <Text>{i}</Text>
            )
        return [testCreate(i-1),<Text>{i}</Text>]
    }

    return (
        <View style={style.MainArea}>
            <HomeHeader />
            {initialScreen()}
            
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