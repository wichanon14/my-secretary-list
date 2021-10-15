import React from 'react'
import { View, StyleSheet } from 'react-native';
import HomeHeader from '../elements/HomeHeader'
import ListDisplay from '../elements/TaskLists/ListDisplay';
import WeeklyDisplayBar from '../elements/TaskLists/WeeklyDisplayBar';
import MenuBar from '../elements/MenuBar'

function Home(){

    return (
        <View style={style.HomeArea}>
            <HomeHeader/>
            <WeeklyDisplayBar/>
            <ListDisplay height={'57%'}/>
            <MenuBar />
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