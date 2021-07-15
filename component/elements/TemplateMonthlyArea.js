import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { toDaysAbbr } from '../central';

const TemplateMonthlyArea = (props)=>
{
    const [ periodType, setPeriodType ] = useState('date');
    const [ periodStore, setPeriodStore ] = useState([]);
    const [ weekTempSelect, setWeekTempSelect ] = useState(null);
    const [ dayTempSelect, setDayTempSelect ] = useState(null);

    useEffect(()=>{
        setPeriodStore([]);
    },[periodType])

    useEffect(()=>{
        if( weekTempSelect && dayTempSelect )
        {
            addDayObj(weekTempSelect,dayTempSelect)
            setWeekTempSelect(null);
            setDayTempSelect(null);
        }
    },[weekTempSelect,dayTempSelect])

    const addDateObj = (date)=>
    {
        let index = periodStore.findIndex((val)=>val.date===date)
        let newStore = periodStore;

        if(index >= 0)
        {
            newStore.splice(index,1)
        }
        else
        {
            newStore.push(
                {
                    date:date
                }
            )
        }
        setPeriodStore([...newStore]);
    }

    const addDayObj = (week,day)=>
    {
        let index = periodStore.findIndex((val)=>val.day===day && val.week===week)
        let newStore = periodStore;

        if(index >= 0)
        {
            newStore.splice(index,1)
        }
        else
        {
            newStore.push(
                {
                    week:week,
                    day:day
                }
            )
        }
        setPeriodStore([...newStore]);
    }

    const isSelectedBackground = (i,type)=>
    {
        if( periodType === 'date' )
        {
            let obj = periodStore.filter((val)=>val.date===i);

            if(obj.length>0)
                return 'black'
            return 'white'
        }
        else
        {
            if( type === 'week' )
            {
                if(i === weekTempSelect)
                    return 'black'
                return 'white'
            }
            else
            {
                if(i === dayTempSelect)
                    return 'black'
                return 'white'
            }
        }
    }

    const isSelectedTextColor = (i,type)=>
    {
        if( periodType === 'date' )
        {
            let obj = periodStore.filter((val)=>val.date===i);

            if(obj.length>0)
                return 'white'
            return 'black'
        }
        else
        {
            if( type === 'week' )
            {
                if(i === weekTempSelect)
                    return 'white'
                return 'black'
            }
            else
            {
                if(i === dayTempSelect)
                    return 'white'
                return 'black'
            }
        }
    }

    const renderTypeChoice = (type) =>
    {
        if( type === periodType )
            return 'check-square'
        
        return 'square'
    }

    const renderPeriod = (type) =>
    {
        if( type === 'date')
            return [
                <View style={{minHeight:15}}></View>,
                <View style={{minHeight:50,maxHeight:50,width:'80%',borderWidth:1,borderRadius:30,marginLeft:'10%'}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {DateGenerate()}
                    </ScrollView>
                </View>,
                <View style={{minHeight:35,marginLeft:'10%',flexDirection:'row'}}>
                    {periodStore.length>0&&<Text>{"Every >> "}</Text>}
                    {periodStore.map((val,i)=>(
                        <Text style={{marginRight:'1%'}}>{val.date}</Text>
                    ))}
                </View>
            ]
        else 
            return (
                <View>
                    <View style={{minHeight:40,width:'80%',borderRadius:30,marginLeft:'10%',flexDirection:'row'}}>
                        {WeekGenerate()}
                    </View>
                    <View style={{minHeight:40,width:'80%',borderRadius:30,marginLeft:'10%',flexDirection:'row'}}>
                        {DayGenerate()}
                    </View>
                    <View style={{minHeight:20,marginLeft:'10%',flexDirection:'row'}}>
                        {periodStore.length>0&&<Text>{"Every >> "}</Text>}
                        {periodStore.map((val,i)=>(
                            <Text style={{marginRight:'1%'}}>W{val.week}{toDaysAbbr(val.day)}</Text>
                        ))}
                    </View>
                </View>
            )
    }

    const WeekGenerate = ()=>
    {
        let weekComponent = [];
        
        for(let i =1; i<=4; i++)
        {
            weekComponent.push(
                <TouchableOpacity key={'week_'+i} onPress={()=>setWeekTempSelect(i)}
                    style={{flex:1,justifyContent:'center',marginLeft:10}}>
                    <Text style={{fontSize:15,fontWeight:'bold',borderWidth:1,backgroundColor:isSelectedBackground(i,'week'),
                        borderRadius:20,textAlign:'center',color:isSelectedTextColor(i,'week')}}> {'Week '+i} </Text>
                </TouchableOpacity>
            )
        }


        return weekComponent;
    }

    const DayGenerate = ()=>
    {
        let dayComponent = [];
        
        for(let i =1; i<=7; i++)
        {
            dayComponent.push(
                <TouchableOpacity key={'day_'+i} onPress={()=>setDayTempSelect(i)}
                    style={{flex:1,justifyContent:'center',marginLeft:10}}>
                    <Text style={{fontSize:20,fontWeight:'bold',backgroundColor:isSelectedBackground(i,'day'),
                        borderWidth:1,borderRadius:20,textAlign:'center',color:isSelectedTextColor(i,'day')}}> {toDaysAbbr(i)} </Text>
                </TouchableOpacity>
            )
        }


        return dayComponent;

    }

    const DateGenerate = ()=>
    {
        let dateComponent = [];
        
        for(let i =1; i<=31; i++)
        {
            dateComponent.push(
                <TouchableOpacity key={'date_'+i} onPress={()=>addDateObj(i)}
                    style={{flex:1,justifyContent:'center',marginLeft:10}}>
                    <Text style={{color:isSelectedTextColor(i),fontSize:20,fontWeight:'bold',borderWidth:1,borderRadius:20,backgroundColor:isSelectedBackground(i)}}> {i} </Text>
                </TouchableOpacity>
            )
        }

        dateComponent.push(
            <TouchableOpacity key={'date_eom'} onPress={()=>addDateObj('eom')}
                style={{flex:1,justifyContent:'center',marginLeft:10,marginRight:10}}>
                <Text style={{color:isSelectedTextColor('eom'),fontSize:20,fontWeight:'bold',borderWidth:1,borderRadius:20,backgroundColor:isSelectedBackground('eom')}}> EOM </Text>
            </TouchableOpacity>
        )

        return dateComponent;

    }

    return (
        <View style={style.modalArea}>

            <View style={style.topicArea}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>MONTHLY TEMPLATE</Text>
            </View>
            <View style={{flex:0.1}}></View>
            <TextInput height={50} placeholder="Task Name" style={style.taskInput}/>
            <View style={{flex:0.05}}></View>
            <View style={{minHeight:30,width:'80%',marginLeft:'10%',flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity style={{marginLeft:'5%'}} onPress={()=>setPeriodType('date')}>
                    <Text>
                        <Icon name={renderTypeChoice('date')} size={20} regular color="black" />  date
                    </Text>                    
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:'5%'}} onPress={()=>setPeriodType('day')}>
                    <Text>
                        <Icon name={renderTypeChoice('day')} size={20} regular color="black" />  day
                    </Text>                    
                </TouchableOpacity>
            </View>
            <View style={{flex:0.15}}></View>
            {renderPeriod(periodType)}
            <TouchableOpacity style={style.createTaskButton}>
                <Text style={{color:'white',fontSize:20}}>CREATE</Text>
            </TouchableOpacity>
        </View>
    )
}


const style = StyleSheet.create({
    backdropArea:{
        backgroundColor:'rgba(0,0,0,0.5)',
        height:'100%'
    },
    modalArea:{
        flex:1,
        height:'70%',
        backgroundColor:'white',
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    topicArea:{
        padding:'5%',
        alignSelf:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderBottomWidth:1,
        width:'90%'
    },
    dateDisplay:{
        color:'black',
        fontSize:18,
        marginLeft:'10%',
        marginTop:'8%',
        marginBottom:'2%',
        paddingLeft:10
    },
    createTaskButton:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%',
        height:'15%',
        backgroundColor:'black',
        width:'80%',
        alignSelf:'center',
        borderRadius:10
    },
    taskInput:{
        margin:'10%',
        marginBottom:'5%',
        marginTop:'4%',
        paddingLeft:20,
        paddingRight:20,
        borderWidth:1,
        borderRadius:20
    },
    warningView:{
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
        marginBottom:'5%',
    },
    warningMessage:{
        color:'red'
    }
})


export default TemplateMonthlyArea;