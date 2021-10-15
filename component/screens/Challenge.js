import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeHeader from '../elements/HomeHeader';
import MenuBar from '../elements/MenuBar';
import ChallengeListDisplay from '../elements/Challenge/ChallengeListDisplay';
import ChallengeListHistory from '../elements/Challenge/ChallengeListHistory';

const Challenge = () =>
{
    return (
        <View style={style.MainArea}>
            <HomeHeader />
            <ChallengeListDisplay height={'61%'} />
            <MenuBar />
        </View>
    )
}

const style = StyleSheet.create({
    MainArea:{
        flexDirection:'column',
        flex:1,
        minHeight:'100%',
        maxHeight:'100%',
        marginTop:'7%'
    }
})

export default Challenge;