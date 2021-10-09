import React from 'react'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'


const ChallengeListDisplay = (props)=>
{
    const style = StyleSheet.create({
        ListArea:{
            minHeight:props.height,
            maxHeight:props.height,
            //borderWidth:1
            //backgroundColor:"#d6d6d6"
        },
        Card : {
            minWidth:130,
            //borderWidth:1, 
            borderRadius:20,
            marginLeft:7,
            marginRight:7,
            backgroundColor:'#fa4343',
            justifyContent:'center',
            alignItems:'center'
        }
    })

    return (
        <View style={style.ListArea}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={style.Card}>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>Get up @3AM</Text>
                </TouchableOpacity>
                <View style={[style.Card,{backgroundColor:'white',borderWidth:4,borderColor:'#fa4343'}]}>

                </View>
            </ScrollView>
        </View>
    )
}

export default ChallengeListDisplay;