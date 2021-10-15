import React, { useEffect,useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { getMonthName, getMonthAbbr } from '../label'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import CalendarModal from './CalendarModal';
import ChallengeHeader from './Challenge/ChallengeHeader';

function HomeHeader(){

    const dateOpt = useSelector((state)=>state.DateOpt)
    const profileSetting = useSelector(state=>state.ProfileSetting)
    const [currentDate,setCurrentDate] = useState(dateOpt.DateSelected)
    const navigation = useNavigation();
    const [ popupCalendar, setPopupCalendar ] = useState(false);
    const route = useRoute();


    useEffect(()=>{
        setCurrentDate(dateOpt.DateSelected)
    },[dateOpt.DateSelected])

    const RouteAction = ()=>
    {
        if( route.name === 'Home')
        {
            navigation.navigate('Ledger')
        }
        else
        {
            navigation.navigate('Home')
        }
    }

    const TempIcon = ()=>
    {
        if( route.name === 'Home')
        {
            return { icon:'wallet', title:'wallet'}
        }
        else
        {
            return { icon:'home', title:'Home'}
        }
    }

    const renderPeriodOnHeader = ()=>
    {
        switch(route.name)
        {
            case 'Home':
                return (
                    <View style={{minHeight:'5%'}}>
                        <Text style={[style.monthYearLabel]}>
                            {getMonthName(currentDate.getMonth())}, {currentDate.getFullYear()}
                        </Text>
                    </View>
                )
            case 'Ledger':
                return (
                    <TouchableOpacity key={'ledger'} style={{minHeight:'5%'}} 
                        onPress={()=>setPopupCalendar(true)}>
                        <Text style={[style.monthYearLabel]}>
                            {(new Date(profileSetting.StartLedgerPeriod)).getDate()} {getMonthAbbr( (new Date(profileSetting.StartLedgerPeriod)).getMonth() )} - 
                            {(new Date(profileSetting.FinishLedgerPeriod)).getDate()} {getMonthAbbr( (new Date(profileSetting.FinishLedgerPeriod)).getMonth() )} 
                        </Text>
                        {popupCalendar&&<CalendarModal key={'calendar_modal'} popup={popupCalendar} setPopupCalendar={setPopupCalendar} />}
                    </TouchableOpacity>
                )
            case 'Challenge':
                return (
                    <ChallengeHeader />
                )
        }
    }

    return (
        <View style={[style.areaAndAlign]}>    
            <View style={{minHeight:'8%',flexDirection:'row',justifyContent:'flex-end',paddingRight:'5%',paddingTop:'4%'}}>
                <TouchableOpacity onPress={()=>RouteAction()}>
                    <Icon name={TempIcon().icon} size={30} color="black" />
                    <Text style={{fontSize:10,marginTop:'-10%'}}>
                        Wallet
                    </Text>
                </TouchableOpacity>
            </View>
            {
                renderPeriodOnHeader()
            }
        </View>
    )

}

const style = StyleSheet.create({
    areaAndAlign : {
        width:'100%',
        minHeight:'18%',
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