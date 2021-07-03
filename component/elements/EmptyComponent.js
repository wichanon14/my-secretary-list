import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import Add from '../../assets/plus-sign-button.png';

const EmptyComponent = (props)=>
{

    return (
        <View style={{borderWidth:0.25,flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e1e2e3'}} >
            <TouchableOpacity onPress={()=>props.setModal(!props.show)}>
                <Image source={Add} style={{resizeMode:'stretch',width:150,height:150,opacity:0.3}} />
                <Text>...........................................</Text>
            </TouchableOpacity>
        </View>
    )

}

export default EmptyComponent;