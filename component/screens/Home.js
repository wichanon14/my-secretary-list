import React from 'react'
import { View, StyleSheet } from 'react-native';
import Header from '../elements/Header'
import ListDisplay from '../elements/ListDisplay';
import WeeklyDisplay from '../elements/WeeklyDisplay';

function Home(){

    return (
        <View style={style.HomeArea}>
            <Header/>
            <WeeklyDisplay/>
            <ListDisplay/>
        </View>
    )
}

const style = StyleSheet.create({
    HomeArea:{
        flexDirection:'column',
        flex:1,
        minHeight:'100%',
        maxHeight:'100%',
        marginTop:'7%'
    }
})

export default Home;