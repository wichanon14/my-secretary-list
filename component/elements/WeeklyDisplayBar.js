import React, { useEffect, useState } from 'react'
import { View,StyleSheet,Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getDayAbbr } from '../label'
import { setDateSelected } from '../action'

const WeeklyDisplayBar = ()=>{

    const dateOpt = useSelector(state=>state.DateOpt);
    const dispatch = useDispatch()
    const [dayOfWeek,setDayOfWeek] = useState([])
    const [currentDate,setCurrentDate] = useState(dateOpt.DateSelected)

    useEffect(()=>{
        setCurrentDate(dateOpt.DateSelected)
        generateDayOfWeek()
    },[dateOpt.DateSelected])

    const pickDate = (date)=>{
        setCurrentDate(date);
        dispatch(setDateSelected(date))
    }

    const generateDayOfWeek = () =>{
        
        let newDayOfWeek = [];
        let dateSelected = Date.parse(currentDate);

        // get 3 days before current day
        for(i=3;i>0;i--)
        {
            let day = new Date( dateSelected-(i*86400000) )
            newDayOfWeek.push(day);
        }
        
        // selected date or current date
        newDayOfWeek.push(currentDate);

        // get 3 days after current day
        for(i=1;i<4;i++)
        {
            let day = new Date( dateSelected+(i*86400000) )
            newDayOfWeek.push(day);
        }

        setDayOfWeek([...newDayOfWeek]);

    }

    return (
        <View style={[style.AreaAndAlign,{flexDirection:'row',backgroundColor:'black'}]}>
            {
                dayOfWeek.map((val,i)=>(
                    <TouchableOpacity key={'day_'+i} style={[style.DatePickArea,
                        (i===3)?{backgroundColor:'black',borderWidth:1,borderColor:'white'}:{backgroundColor:'white'}]}
                        onPress={()=>pickDate(val)} >
                        <Text style={
                            (i===3)?[{color:(!val.getDay())?'red':'white',fontWeight:'bold'}]:[{color:(!val.getDay())?'red':'black',fontWeight:'bold'}]
                        }>
                            {getDayAbbr(val.getDay())}
                        </Text>
                        <Text style={(i===3)?{color:'white'}:{color:'black'}}>{val.getDate()}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const style = StyleSheet.create({
    AreaAndAlign : {
        borderWidth:1,
        flexDirection:'row',
        width:'100%',
        minHeight:'12%',
        maxHeight:'12%',
        alignItems:'flex-end',
        paddingLeft:'3%',
        paddingBottom:'2%'
    },
    DatePickArea : {
        borderWidth:1,
        borderRadius:10,
        minWidth:'10%',
        minHeight:'90%',
        maxHeight:'90%',
        marginLeft:'3%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffff'
    }
})

export default WeeklyDisplayBar;