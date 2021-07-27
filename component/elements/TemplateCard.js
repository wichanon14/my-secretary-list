import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { toDaysAbbr } from '../central'
import TemplateCreateModal from './TemplateCreateModal'

const TemplateCard = (props)=>
{

    const templates = useSelector(state=>state.Template)
    const [ showTaskCreatedModal, setShowTaskCreatedModal ] = useState(false)

    const renderBadge = ()=>
    {
        if(props.data.period && templates.template_tab === 'weekly')
        {
            let periodBadges = JSON.parse( props.data.period )
            let results = []
            periodBadges.forEach((val,i) => {
                results.push(
                    <Text key={`badge_${i}_${val.day}`} style={{marginLeft:'4%',paddingLeft:8,paddingRight:8,margin:'2%',marginRight:0,
                        borderRadius:20,backgroundColor:'#000',color:'white'}}>
                        {toDaysAbbr(val.day)}
                    </Text>
                )
            });
            return results;
        }
        if(props.data.period && templates.template_tab === 'monthly')
        {
            let periodBadges = JSON.parse( props.data.period )
            let results = []
            
            periodBadges.forEach((val,i) => {
                results.push((val.week)?
                    <Text key={`badge_${i}_${val.week}_${val.day}`} 
                        style={{marginLeft:'4%',paddingLeft:8,paddingRight:8,margin:'2%',
                        marginRight:0,borderRadius:20,backgroundColor:'#000',color:'white'}}>
                        W{val.week}{toDaysAbbr(val.day)}
                    </Text>:
                    <Text key={`badge_date_${i}_${val.date}`} 
                        style={{marginLeft:'4%',paddingLeft:8,paddingRight:8,margin:'2%',
                        marginRight:0,borderRadius:20,backgroundColor:'#000',color:'white'}}>
                        {val.date}
                    </Text>
                )
            });
            return results;
        }
        
        return [];
    }


    return (
        <TouchableOpacity style={style.cardArea} onLongPress={()=>setShowTaskCreatedModal(true)}>
            <View style={{minHeight:50,flexDirection:'row',alignItems:'center',marginLeft:'5%'}}>
                <Icon name={'file'} regular size={20} color="rgba(0,0,0,0.6)" />
                <Text style={{fontSize:15}}>   {props.data.task_name}</Text>
            </View>
            {
                (props.data.period)?(
                    <View style={{minHeight:30,flexDirection:'row',alignItems:'center',borderTopWidth:1,borderColor:'rgba(0,0,0,0.2)'}}>
                        {renderBadge()}
                    </View>
                ):(<View></View>)
            }
            <TemplateCreateModal data={props.data} edit={true}
                setShow={setShowTaskCreatedModal} show={showTaskCreatedModal} />
        </TouchableOpacity>
    )
}

const style=StyleSheet.create({
    cardArea : {
        flex:1,
        width:'80%',
        alignSelf:'center',
        marginTop:'8%',
        borderRadius:10,
        borderWidth:1
    }
})


export default TemplateCard;