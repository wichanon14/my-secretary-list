import React from 'react';
import { Text } from 'react-native'

const LedgerType = (props)=>
{
    return (
        <Text style={{fontSize:15,borderWidth:1,minWidth:'80%',
            backgroundColor:(props.selected)?'black':'white',color:(props.selected)?'white':'black',
            margin:'3%',paddingLeft:'5%',padding:'2%',borderRadius:20}}>
            {props.text}
        </Text>
    )
}

export default LedgerType;