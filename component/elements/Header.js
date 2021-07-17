import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

const Header = (props)=>
{
    return (
        <View style={style.areaAndAlign}>
            <Text style={style.TopicStyle}>{props.title}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    areaAndAlign : {
        flexDirection:'row',
        width:'100%',
        height:'18%',
        paddingLeft:'5%',
        paddingBottom:'4%',
        alignItems:'flex-end'
    },
    TopicStyle : {
        fontSize: 35,
        fontWeight:'bold',
        color:'black'
    }        
})

export default Header;