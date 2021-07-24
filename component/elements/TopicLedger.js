import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const TopicLedger = (props)=>
{

    return (
        <View style={{margin:'5%',flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>props.createFirstTopicModal(true)}>
                <Text style={{fontSize:25,fontWeight:'bold',borderBottomWidth:1}}>
                    {props.component.title}
                </Text>
            </TouchableOpacity>
            {
                (!props.isLock) && 
                <TouchableOpacity style={{marginTop:'1.5%',marginLeft:'2%'}} 
                    onPress={()=>{
                        props.setTypeModal(true)
                        let data = props.AddNewForm(props.component);
                        props.setComponent(data);
                    }}>
                    <Icon name={'plus-square'} regular size={20} color="black" ></Icon>
                </TouchableOpacity>
            }
            
        </View>
    )
}

export default TopicLedger;