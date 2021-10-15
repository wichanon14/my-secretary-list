import React from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import TemplateCard from './TemplateCard';

const ListTemplateDisplay = (props)=>{

    const templates = useSelector(state=>state.Template)
    

    const style = StyleSheet.create({
        ListArea:{
            minHeight:props.height,
            maxHeight:props.height,
            //backgroundColor:"#d6d6d6"
        }
    })

    const renderTemplateLists = ()=>
    {
        switch(templates.template_tab)
        {
            case 'daily' : return (
                templates.daily_template.map((val,i)=>(
                    <TemplateCard key={val.id} data={val} />
                ))
            )
            case 'weekly' : return (
                templates.weekly_template.map((val,i)=>(
                    <TemplateCard key={val.id} data={val}/>
                ))
            )
            case 'monthly' : return (
                templates.monthly_template.map((val,i)=>(
                    <TemplateCard key={val.id} data={val}/>
                ))
            )

        }
    }

    return (
        <View style={style.ListArea}>
            <ScrollView style={{flex:1}}>
                {
                    renderTemplateLists()
                }
                <View style={{minHeight:100}}></View>
            </ScrollView>
        </View>
    )


}




export default ListTemplateDisplay;