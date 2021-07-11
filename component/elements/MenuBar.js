import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import Space from './Space'
import TaskCreatedModal from './TaskCreatedModal'
import { useNavigation, useRoute } from '@react-navigation/native';

const MenuBar = ()=>
{

    const [ selected, setSelected ] = useState('clipboard-list')
    const [ showTaskCreatedModal, setShowTaskCreatedModal ] = useState(false);
    const dateSelected = useSelector(state=>state.DateOpt);
    const navigation = useNavigation();
    const route = useRoute();

    const backgroundColor = (name) =>{

        if(route.name === name)
            return 'red'
        return 'black'

    }

    return (
        <View style={style.ScopeArea}>
            <Space size={0.3} />
            <Icon name={'clipboard-list'} size={40} color="white" 
                onPress={()=>navigation.navigate('Home')}
                style={[style.MenuArea,{backgroundColor:backgroundColor('Home')}]} />
            
            <Space size={0.3} />
            <Icon name={'bullseye'} size={40} color="white" 
                onPress={()=>navigation.navigate('Template')}
                style={[style.MenuArea,{backgroundColor:backgroundColor('Template')}]} />
            
            <Space size={0.3} />
            <Icon name={'plus-circle'} size={90} color="white" style={style.PlusArea} onPress={()=>setShowTaskCreatedModal(true)}/>
            
            <Space size={0.5} />
            <Icon name={'calendar-alt'} size={40} color="white" onPress={()=>setSelected('calendar-alt')}
                style={[style.MenuArea,{backgroundColor:backgroundColor('calendar-alt')}]} />
            
            <Space size={0.3} />
            <Icon name={'sliders-h'} size={40} color="white" onPress={()=>setSelected('sliders-h')}
                style={[style.MenuArea,{backgroundColor:backgroundColor('sliders-h')}]} />
            
            <Space size={0.3} />
            { // Destroy when modal hide
            (showTaskCreatedModal)?(<TaskCreatedModal date={dateSelected.DateSelected} setShow={setShowTaskCreatedModal} show={showTaskCreatedModal}/>):(<View></View>)}
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