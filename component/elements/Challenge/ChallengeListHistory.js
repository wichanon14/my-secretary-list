import React from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'


const ChallengeListHistory = (props)=>
{
    const style = StyleSheet.create({
        ListArea:{
            minHeight:props.height,
            maxHeight:props.height,
            //borderWidth:1
            //backgroundColor:"#d6d6d6"
        }
    })

    return (
        <View style={style.ListArea}>
            <ScrollView style={{flex:1}}>

                <View style={{minHeight:100}}></View>
            </ScrollView>
        </View>
    )
}

export default ChallengeListHistory;