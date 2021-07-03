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
        height:'11%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black'
    },
    TopicStyle : {
        fontSize: 20,
        fontWeight:'bold',
        color:'white'
    }        
})

export default Header;