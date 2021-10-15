import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { toyyyyMMDD } from '../../central'

const ChallengeHeader = (props) =>{
    return (
        <View style={{minHeight:'15%',borderWidth:1,width:'95%'}}>
            <Text style={[style.monthYearLabel]}>
                Challenge{' '}
                <Text style={{fontSize:15}}>( {toyyyyMMDD(new Date())} )</Text>
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    monthYearLabel : {
        fontSize: 30,
        fontWeight:'bold',
        color:'#222423'
    }
})

export default ChallengeHeader;