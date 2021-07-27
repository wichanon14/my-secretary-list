import React from 'react';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const LedgerTextAndSumResultInput = (props) =>
{
    const dispatch = useDispatch();
    const LedgerState = useSelector(state=>state.Ledger)


    return (
        <TextInput placeholder={'Text For Sum Title'} 
            value={LedgerState.temp.title}
            onChangeText={(e)=>dispatch(
                {
                    type:'SET_TEMP_LEDGER',payload:{...LedgerState.temp,title:e}
                }
            )
        }
            style={{borderRadius:20,paddingLeft:'5%',minWidth:'60%',maxWidth:'60%',borderWidth:1,marginRight:'2%'}}/>
    )
}

export default LedgerTextAndSumResultInput;