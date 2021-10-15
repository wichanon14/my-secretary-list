import React from 'react'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'


const ChallengeListDisplay = (props)=>
{
    const style = StyleSheet.create({
        ListArea:{
            minHeight:props.height,
            maxHeight:props.height
        },
        Card : {
            minWidth:130,
            minHeight:80,
            borderWidth:1,
            width:'90%',
            borderRadius:15,
            marginLeft:'5%',
            marginTop:'5%',
            justifyContent:'center',
            padding:'3%',
            backgroundColor:'#FFFF'
        }
    })

    return (
        <View style={style.ListArea}>
            <ScrollView style={{flex:1}}>
                <TouchableOpacity style={style.Card}>
                    <View>
                        <View style={{flexDirection:'row',minHeight:30}}>
                            <View style={{flex:0.15,borderWidth:1,minHeight:35}}></View>
                            <View style={{flex:0.85}}>
                                <Text style={{fontSize:15,fontWeight:'bold',marginLeft:'3%'}}>
                                    Get up @3AM
                                </Text>
                                <Text style={{fontSize:10,marginLeft:'3%'}}>
                                    Latest 2021-10-06
                                </Text>
                            </View>
                        </View>
                        <View style={{minHeight:10,flexDirection:'row'}}>
                            <View style={{flex:0.95,justifyContent:'center'}}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{width:'80%',backgroundColor:'green',minHeight:3}}></View>
                                    <View style={{width:'20%',backgroundColor:'gray',minHeight:3}}></View>
                                </View>
                            </View>
                            <Text style={{marginLeft:'5%'}}>
                                80%
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default ChallengeListDisplay;