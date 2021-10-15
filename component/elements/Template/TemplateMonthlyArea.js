import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { toDaysAbbr } from '../../central';
import { AddTemplate, EditTemplate, DeleteTemplate } from '../../database'

const TemplateMonthlyArea = (props)=>
{
    const [ periodType, setPeriodType ] = useState(()=>{
        if(props.edit)
        {
            let period = props.data.period;
            let found = period.indexOf("week");
            if(found!==-1)
            {
                return 'day'
            }
            else
            {
                return 'date'
            }
        }
        else
            return 'date'
    });
    const [ periodStore, setPeriodStore ] = useState((props.edit)?JSON.parse(props.data.period):[]);
    const [ weekTempSelect, setWeekTempSelect ] = useState(null);
    const [ dayTempSelect, setDayTempSelect ] = useState(null);
    const [ task_name, setTaskName ] = useState((props.edit)?props.data.task_name:null)
    const [ emptyTaskWarning, setEmptyTaskWarning ] = useState(false)
    const [ emptyPeriodWarning, setEmptyPeriodWarning ] = useState(false)
    const db = useSelector(state=>state.database.connection)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(task_name)
            setEmptyTaskWarning(false)
        if(periodStore.length > 0 )
            setEmptyPeriodWarning(false)
    },[task_name,periodStore])

    useEffect(()=>{
        if( weekTempSelect && dayTempSelect )
        {
            addDayObj(weekTempSelect,dayTempSelect)
            setWeekTempSelect(null);
            setDayTempSelect(null);
        }
    },[weekTempSelect,dayTempSelect])

    const createMonthlyTemplate = ()=>
    {
        if( task_name && periodStore.length>0 )
        {
            let data = {
                task_name:task_name,
                type:'monthly',
                period:JSON.stringify(periodStore),
            }
            AddTemplate(db,data,dispatch,props.setShow)
        }
        else
        {
            if(!task_name)
            {
                setEmptyTaskWarning(true)
            }
            else
            {
                setEmptyPeriodWarning(true)
            }
        }
    }

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
                <View key={'date_top'} style={{minHeight:15}}></View>,
                <View key={'date_content'} style={{minHeight:50,maxHeight:50,width:'80%',borderWidth:1,borderRadius:30,marginLeft:'10%'}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {DateGenerate()}
                    </ScrollView>
                </View>,
                <View key={'date_period'} style={{minHeight:35,marginLeft:'10%',flexDirection:'row'}}>
                    {periodStore.length>0&&<Text>{"Every >> "}</Text>}
                    {periodStore.map((val,i)=>(
                        <Text key={`date_${i}`} style={{marginRight:'1%'}}>{val.date}</Text>
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
                            <Text key={`W${i}_`} style={{marginRight:'1%'}}>W{val.week}{toDaysAbbr(val.day)}</Text>
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

    const renderCreateButton = ()=>
    {
        if(!props.edit)
            return (
                <TouchableOpacity style={style.createTaskButton} onPress={()=>createMonthlyTemplate()}>
                    <Text style={{color:'white',fontSize:20}}>CREATE</Text>
                </TouchableOpacity>
            )
        
        return (
            <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-around'}}>
                <TouchableOpacity style={[style.EditButton,{backgroundColor:'black'}]} onPress={()=>updateMonthlyTemplate()}>
                    <Text style={{color:'white',fontSize:20}}>UPDATE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.EditButton,{backgroundColor:'red'}]} onPress={()=>DeleteTemplate(db,props.data,dispatch,props.setShow)}>
                    <Text style={{color:'white',fontSize:20}}>DELETE</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const updateMonthlyTemplate = ()=>
    {
        if( task_name && periodStore.length>0 )
        {
            let data = props.data;
            data.task_name = task_name;
            data.period = JSON.stringify(periodStore);
            EditTemplate(db,data,dispatch,props.setShow)
        }
        else
        {
            if(!task_name)
            {
                setEmptyTaskWarning(true)
            }
            else
            {
                setEmptyPeriodWarning(true)
            }
        }
    }

    return (
        <View style={style.modalArea}>

            <View style={style.topicArea}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>MONTHLY TEMPLATE</Text>
            </View>
            <View style={{flex:0.1}}></View>
            <TextInput height={50} placeholder="Task Name" onChangeText={(e)=>setTaskName(e)}
                value={task_name} style={style.taskInput}/>
            <View style={{flex:0.05}}></View>
            <View style={{minHeight:30,width:'80%',marginLeft:'10%',flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity style={{marginLeft:'5%'}} onPress={()=>[setPeriodStore([]),setPeriodType('date')]}>
                    <Text>
                        <Icon name={renderTypeChoice('date')} size={20} regular color="black" />  date
                    </Text>                    
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:'5%'}} onPress={()=>[setPeriodStore([]),setPeriodType('day')]}>
                    <Text>
                        <Icon name={renderTypeChoice('day')} size={20} regular color="black" />  day
                    </Text>                    
                </TouchableOpacity>
            </View>
            <View style={{flex:0.15}}></View>
            {renderPeriod(periodType)}
            <View style={{maxHeight:40,flex:0.1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                {
                    emptyTaskWarning && <Text style={{color:'red'}}>Can't create empty task.</Text>
                }
                {
                    emptyPeriodWarning && <Text style={{color:'red'}}>Can't create task on non-selected day.</Text>
                }
            </View>
            {
                renderCreateButton()
            }
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
    EditButton:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%',
        height:'45%',
        width:'40%',
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