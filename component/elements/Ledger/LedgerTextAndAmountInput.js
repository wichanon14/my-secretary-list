import React from 'react'
import { View, TextInput, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ValidFloatNumber } from '../../central'

const LedgerTextAndAmountInput = (props) =>
{

    const dispatch = useDispatch();
    const LedgerState = useSelector(state=>state.Ledger)

    return (
        <View style={{borderWidth:1,padding:'3%',minWidth:'60%',maxWidth:'60%',marginRight:'2%',borderRadius:20}}>
            <TextInput placeholder={'Text For Title'}
                value={LedgerState.temp.title}
                onFocus={props.scrollTo}
                autoFocus={true}
                onChangeText={(e)=>dispatch(
                        {
                            type:'SET_TEMP_LEDGER',payload:{...LedgerState.temp,title:e}
                        }
                    )
                }
                style={{paddingLeft:'10%',minWidth:'100%',borderWidth:1,marginBottom:'5%',borderRadius:20}}/>
            <TextInput placeholder={'Number For Paid Amout'}
                value={`${LedgerState.temp.value}`}
                onChangeText={(e)=>{
                        dispatch(
                            {
                                type:'SET_TEMP_LEDGER',payload:{...LedgerState.temp,value:e}
                            }
                        )
                    }
                }
                style={{paddingLeft:'10%',minWidth:'100%',borderWidth:1,marginBottom:'2%',borderRadius:20}}/>
        </View>
    )
}

export default LedgerTextAndAmountInput;