import React, { useEffect,useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { getMonthName } from '../label'

function HomeHeader(){

    const dateOpt = useSelector((state)=>state.DateOpt)
    const [currentDate,setCurrentDate] = useState(dateOpt.DateSelected)

    useEffect(()=>{
        setCurrentDate(dateOpt.DateSelected)
    },[dateOpt.DateSelected])

    return (
        <View style={[style.areaAndAlign]}>    
            <View>
                <Text style={[style.monthYearLabel]}>
                    {getMonthName(currentDate.getMonth())}, {currentDate.getFullYear()}
                </Text>
            </View>
        </View>
    )

}

const style = StyleSheet.create({
    areaAndAlign : {
        flexDirection:'row',
        width:'100%',
        minHeight:'18%',
        alignItems:'flex-end',
        paddingLeft:'5%',
        paddingBottom:'4%'
    },
    monthYearLabel : {
        fontSize: 35,
        fontWeight:'bold',
        color:'#222423'
    }        
})

export default HomeHeader;