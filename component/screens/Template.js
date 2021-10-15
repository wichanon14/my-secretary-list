import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MenuBar from '../elements/MenuBar';
import Header from '../elements/TaskLists/Header';
import PeriodDisplay from '../elements/Template/PeriodDisplay';
import ListTemplateDisplay from '../elements/Template/ListTemplateDisplay';

const Template = ()=> 
{
    return (
        <View style={style.MainArea}>
            <Header title="Task Template" />
            <PeriodDisplay />
            <ListTemplateDisplay height={'61%'} />
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