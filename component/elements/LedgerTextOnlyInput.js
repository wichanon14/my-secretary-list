import React from 'react';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const LedgerTextOnlyInput = (props)=>
{
    const LedgerState = useSelector(state=>state.Ledger)
    const dispatch = useDispatch();

    return (
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
            style={{borderRadius:20,paddingLeft:'5%',minWidth:'60%',maxWidth:'60%',borderWidth:1,marginRight:'2%'}}/>
    )
}

export default LedgerTextOnlyInput;