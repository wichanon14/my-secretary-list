import React, { useState, useEffect } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import Space from './Space'
import TaskCreatedModal from './TaskLists/TaskCreatedModal'
import { useNavigation, useRoute } from '@react-navigation/native';
import TemplateCreateModal from './Template/TemplateCreateModal';
import { GenerateDailyTemplate, WeeklyTemplateGenerate, MonthlyTemplateGenerate } from '../database';

const MenuBar = ()=>
{

    const [ selected, setSelected ] = useState('clipboard-list')
    const [ showTaskCreatedModal, setShowTaskCreatedModal ] = useState(false);
    const dateSelected = useSelector(state=>state.DateOpt);
    const [ datePick, setDatePick ] = useState(dateSelected.DateSelected)
    const navigation = useNavigation();
    const route = useRoute();
    const db = useSelector(state=>state.database.connection)
    const dispatch = useDispatch();

    useEffect(()=>{
        setDatePick(dateSelected.DateSelected)
    },[dateSelected.DateSelected])

    const backgroundColor = (name) =>{

        if(route.name === name)
            return 'red'
        return 'black'

    }

    const createModal = ()=>{
        switch(route.name)
        {
            case 'Home':
                return (
                    <TaskCreatedModal date={dateSelected.DateSelected} setShow={setShowTaskCreatedModal} show={showTaskCreatedModal}/>
                )
            case 'Template':
                return (
                    <TemplateCreateModal setShow={setShowTaskCreatedModal} show={showTaskCreatedModal} />
                )
            default :
                return (<View></View>)
        }
    }

    return (
        <View style={style.ScopeArea}>
            <Space size={0.3} />
            <Icon name={'clipboard-list'} size={40} color="white" 
                onPress={()=>navigation.navigate('Home')}
                style={[style.MenuArea,{backgroundColor:backgroundColor('Home')}]} />
            
            <Space size={0.3} />
            <Icon name={'bullseye'} size={40} color="white" 
                onPress={()=>navigation.navigate('Challenge')}
                style={[style.MenuArea,{backgroundColor:backgroundColor('Challenge')}]} />
            
            <Space size={0.3} />
            <Icon name={'plus-circle'} size={90} color="white" style={style.PlusArea} onPress={()=>setShowTaskCreatedModal(true)}
                onLongPress={()=>{
                    GenerateDailyTemplate(db,datePick,dispatch);
                    WeeklyTemplateGenerate(db,datePick,dispatch);
                    MonthlyTemplateGenerate(db,datePick,dispatch);
                }}/>
            
            <Space size={0.5} />
            <Icon name={'calendar-alt'} size={40} color="white" 
                onPress={()=>navigation.navigate('Template')}
                style={[style.MenuArea,{backgroundColor:backgroundColor('Template')}]} />
            
            <Space size={0.3} />
            <Icon name={'sliders-h'} size={40} color="white" onPress={()=>setSelected('sliders-h')}
                style={[style.MenuArea,{backgroundColor:backgroundColor('sliders-h')}]} />
            
            <Space size={0.3} />
            { // Destroy when modal hide
            (showTaskCreatedModal)?(createModal()):(<View></View>)}
        </View>
    )
}

const style = StyleSheet.create(
    {
        ScopeArea :{
            minHeight:'10%',
            maxHeight:'10%',
            backgroundColor:'black',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            zIndex:2
        },
        MenuArea : {
            padding:'3%'
        },
        PlusArea : {
            marginTop:'-13%',
            borderRadius:70,
            borderWidth:-15,
            backgroundColor:'black',
            zIndex:1
        }
    }
)

export default MenuBar;