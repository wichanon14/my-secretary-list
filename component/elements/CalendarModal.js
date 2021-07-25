import React, { useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getMonthName } from '../label'
import { toyyyyMMDD } from '../central'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfileSetting } from '../database'

const CalendarModal = (props)=>
{
    const profileSetting = useSelector(state=>state.ProfileSetting)
    const dispatch = useDispatch()
    const db = useSelector(state=>state.database.connection);
    const [ month, setMonth ] = useState(()=>{
        let m = new Date();
        return m.getMonth();
    })
    const [ year, setYear ] = useState(()=>{
        let y = new Date();
        return y.getFullYear();
    })
    const [ beginInterval, setBeginInterval ] = useState(()=>{
        if( profileSetting && profileSetting.StartLedgerPeriod)
            return profileSetting.StartLedgerPeriod
        else 
            return null
    });
    const [ finishInterval, setFinishInterval ] = useState(()=>{

        if( profileSetting && profileSetting.FinishLedgerPeriod)
            return profileSetting.FinishLedgerPeriod
        else 
            return null

    });

    useEffect(()=>{
        //console.log(profileSetting)
    },[profileSetting])

    const renderSpaceArrangement = (ms)=>
    {
        if((new Date(ms)).getDay()===6)
            return {
                marginRight:'0%'
            }
        else if((new Date(ms)).getDate()>=10)
            return {
                marginRight:'4%'
            }
        else 
            return {
                marginRight:'4.4%'
            }
    }

    const renderTextColor = (ms,order)=>
    {
        if( (new Date(ms)).getMonth()!== month )
            return {
                disable:true,
                style : {
                    color:'rgba(0,0,0,0.2)',
                    borderWidth:1,
                    borderRadius:0,
                    backgroundColor:'white',
                    borderColor:'rgba(0,0,0,0)',
                }
            }
            // out of month bound
        else if(( beginInterval && ms < beginInterval ) || ( finishInterval && ms > finishInterval ))
            return {
                disable:false,
                style : {
                    color:'rgba(0,0,0,0.2)',
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0)',
                    borderRadius:20,
                    backgroundColor:'white'
                }
            }
            // the day between interval
        else if( ( beginInterval && ms >= beginInterval ) && ( finishInterval && ms <= finishInterval ) )
            return {
                disable:false,
                style : {
                    color:'white',
                    borderWidth:1,
                    borderRadius:30,
                    backgroundColor:'black',
                    borderColor:'rgba(0,0,0,0)'
                }
            }
        else if( ms === beginInterval )
            return {
                disable:false,
                style:{
                    color:'white',
                    borderWidth:1,
                    borderRadius:30,
                    borderTopLeftRadius:20,
                    borderBottomLeftRadius:20,
                    backgroundColor:'black',
                    borderColor:'rgba(0,0,0,0)'
                }

            }
            // sunday
        else if( order % 7 === 0)
            return {
                disable:false,
                style : {
                    color:'rgb(255,0,0)',
                    borderWidth:1,
                    borderRadius:0,
                    backgroundColor:'white',
                    borderColor:'rgba(0,0,0,0)'
                }
            }
        else 
            return {
                disable:false,
                style:{
                    color:'black',
                    borderWidth:1,
                    borderRadius:0,
                    backgroundColor:'white',
                    borderColor:'rgba(0,0,0,0)'
                }
            }
    }

    const renderCalendar = ()=>
    {
        let startDate = new Date(toyyyyMMDD(new Date(year,month,1,0,0,0,0)));
        startDate = Date.parse(startDate);
        while( (new Date(startDate)).getDay() !== 0 )
        {
            startDate = startDate - (3600*24*1000);
        }
        
        let endDate = new Date(toyyyyMMDD(new Date(year,month+1,1,0,0,0,0)));
        endDate = Date.parse(endDate)-(3600*24*1000);
        while( (new Date(endDate)).getDay() !== 6 )
        {
            endDate = endDate + (3600*24*1000);
        }

        let calendarList = [];
        let weekList = [],j=0;
        for(let i = startDate; i<=endDate; i=i+(3600*24*1000), j++ )
        {
            if( j % 7 === 0)
            {
                calendarList.push(
                    <View key={`week_${j}`} style={{flexDirection:'row',width:'100%'}}>
                        {weekList}
                    </View>
                )
                weekList = [];
            }
            const textColorStyle = renderTextColor(i,j);
            weekList.push(
                <TouchableOpacity  key={`calendar_${j}`} onPress={()=>setIntervalCalendar(i)} disabled={textColorStyle.disable}>
                    <View style={[{padding:'1.3%',marginRight:renderSpaceArrangement(i).marginRight}]} >
                        <Text style={[{textAlign:'center'},textColorStyle.style]}>
                            {( (new Date(i)).getDate()>=10 )?(new Date(i)).getDate():'  '+(new Date(i)).getDate()}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        calendarList.push(
            <View key={`calendar_${j}`} style={{flexDirection:'row',width:'100%'}}>
                {weekList}
            </View>
        )
        return calendarList;
        
    }

    const setIntervalCalendar = (ms)=>
    {
        if( beginInterval && finishInterval)
        {
            setBeginInterval(null)
            setFinishInterval(null)
        }
        else if(!beginInterval )
        {
            setBeginInterval(ms)
        }
        else
            setFinishInterval(ms)        
    }

    const saveInterval = ()=>
    {
        if( beginInterval && finishInterval)
        {
            let data = {
                beginInterval:beginInterval,
                finishInterval:finishInterval
            }
            
            UpdateProfileSetting(db,'StartLedgerPeriod',beginInterval,dispatch)
            UpdateProfileSetting(db,'FinishLedgerPeriod',finishInterval,dispatch)
            props.setPopupCalendar(false)
        }
    }

    return (
        <Modal visible={props.popup} onRequestClose={()=>props.setPopupCalendar(false)} transparent={true}>
            <TouchableNativeFeedback onPress={()=>props.setPopupCalendar(false)}>
                <View style={{flex:0.10,backgroundColor:'rgba(0,0,0,0.8)'}}></View>
            </TouchableNativeFeedback>
            <View style={{backgroundColor:'rgba(0,0,0,0.8)',flex:0.73,flexDirection:'row',justifyContent:'center'}}>
                <View style={{width:'80%',alignSelf:'center',backgroundColor:'white',minHeight:'100%',borderRadius:20}}>
                    <View style={{flexDirection:'row',paddingTop:'2%',borderBottomWidth:1,borderBottomColor:'rgba(0,0,0,0.8)'}}>
                        <View style={{marginRight:0,margin:'5%',flex:1,borderRightWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>setMonth(month-1)}>
                                <Icon name={'chevron-left'} size={20} color="black" />
                            </TouchableOpacity> 
                            <Text style={{margin:'5%',fontSize:22}}>{getMonthName(month)}</Text>
                            <TouchableOpacity onPress={()=>setMonth(month+1)}>
                                <Icon name={'chevron-right'} size={20} color="black" />
                            </TouchableOpacity> 
                        </View>
                        <View style={{marginLeft:'1%',margin:'5%',flex:0.7,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>setYear(year-1)}>
                                <Icon name={'chevron-left'} size={20} color="black" />
                            </TouchableOpacity> 
                            <Text style={{margin:'5%',fontSize:25}}>{year}</Text>
                            <TouchableOpacity onPress={()=>[setYear(year+1),renderCalendar()]}>
                                <Icon name={'chevron-right'} size={20} color="black" />
                            </TouchableOpacity> 
                        </View>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignSelf:'center',minHeight:'50%',maxHeight:'50%'}}>
                        <View style={{flexDirection:'row',width:'100%'}}>
                            <Text style={[style.header,{color:'red'}]}>S</Text>
                            <Text style={[style.header]}>M</Text>
                            <Text style={[style.header]}>T</Text>
                            <Text style={[style.header]}>W</Text>
                            <Text style={[style.header]}>Th</Text>
                            <Text style={[style.header]}>F</Text>
                            <Text style={[style.header]}>Sa</Text>
                        </View>
                        {renderCalendar()}
                    </View>
                    <View style={{flexDirection:'row'}}>
                        {
                            beginInterval && <View style={{flex:0.5}}>
                                <Text style={{paddingLeft:'10%',padding:'5%',borderRadius:20,backgroundColor:'black',color:'white'}}>FROM : {toyyyyMMDD(new Date(beginInterval))}</Text>
                            </View>
                        }
                        {
                            finishInterval && <View style={{flex:0.5}}>
                                <Text style={{paddingLeft:'10%',padding:'5%',borderRadius:20,backgroundColor:'red',color:'white'}}>TO : {toyyyyMMDD(new Date(finishInterval))}</Text>
                            </View>
                        }
                    </View>
                    <TouchableOpacity disabled={(beginInterval&&finishInterval)?false:true}  
                        onPress={()=>saveInterval()}
                        style={{flexDirection:'row',minHeight:'25%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                        <View style={{backgroundColor:(beginInterval&&finishInterval)?'black':'rgba(0,0,0,0.5)',height:'40%',borderRadius:20,flex:0.7,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:20}}>SAVE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableNativeFeedback onPress={()=>props.setPopupCalendar(false)}>
                <View style={{flex:0.17,backgroundColor:'rgba(0,0,0,0.8)'}}></View>
            </TouchableNativeFeedback>
        </Modal>
    )
}

const style = StyleSheet.create({
    header:{
        margin:'4%',
        marginLeft:'4.5%',
        fontWeight:'bold',
    }
})

export default CalendarModal;