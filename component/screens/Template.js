import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MenuBar from '../elements/MenuBar';
import Header from '../elements/Header';
import PeriodDisplay from '../elements/PeriodDisplay';
import ListDisplay from '../elements/ListDisplay';

const Template = ()=> 
{
    return (
        <View style={style.MainArea}>
            <Header title="Task Plan Template" />
            <PeriodDisplay />
            <ListDisplay height={'71%'} />
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

export default Template;