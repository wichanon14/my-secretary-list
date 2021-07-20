import React from 'react'
import { View, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ValidFloatNumber } from '../central';

const LedgerTextAndPaidAmountAndLimit = (props) =>
{
    const dispatch = useDispatch();
    const LedgerState = useSelector(state=>state.Ledger)

    return (
        <View style={{borderWidth:1,padding:'3%',minWidth:'50%',maxWidth:'70%',marginRight:'2%',borderRadius:20}}>
            <TextInput placeholder={'Text For Title'}
                value={LedgerState.temp.title}
                onChangeText={(e)=>dispatch(
                        {
                            type:'SET_TEMP_LEDGER',payload:{...LedgerState.temp,title:e}
                        }
                    )
                }
                style={{paddingLeft:'10%',minWidth:'100%',borderWidth:1,marginBottom:'5%',borderRadius:20}}/>
            <TextInput placeholder={'Number For Paid Amount'}
                value={(LedgerState.temp.value)?LedgerState.temp.value.toString():''}
                onChangeText={(e)=>{
                        if( ValidFloatNumber(e) !== false )
                        {
                            dispatch(
                                {
                                    type:'SET_TEMP_LEDGER',payload:{...LedgerState.temp,value:ValidFloatNumber(e)}
                                }
                            )    
                        }
                    }
                }
                style={{paddingLeft:'10%',minWidth:'100%',borderWidth:1,marginBottom:'5%',borderRadius:20}}/>
            <TextInput placeholder={'Number For Limit Paid'}
                value={(LedgerState.temp.limit && LedgerState.temp.limit>0)?LedgerState.temp.limit.toString():''}
                onChangeText={(e)=>{
                        if( ValidFloatNumber(e) !== false )
                        {
                            dispatch(
                                {
                                    type:'SET_TEMP_LEDGER',payload:{...LedgerState.temp,limit:ValidFloatNumber(e)}
                                }
                            )    
                        }
                    }
                }
                style={{paddingLeft:'10%',minWidth:'100%',borderWidth:1,marginBottom:'2%',borderRadius:20}}/>
        </View>
    )
}

export default LedgerTextAndPaidAmountAndLimit;