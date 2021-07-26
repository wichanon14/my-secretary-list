import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const LedgerRowType2 = (props) =>
{

    return (
        <View style={{flexDirection:'row',alignItems:'center',
            marginLeft:(10*props.data.level)+'%',minWidth:'50%',marginBottom:'3%'}}>
            <TouchableOpacity onLongPress={()=>props.edit(props.data)}>
                <Text style={{fontSize:15,fontWeight:(props.data.level<2)?'bold':'normal'}}>
                    {props.data.title} | { }
                    <Text style={{color:(props.data.value>0)?'green':(props.data.value===0)?'black':'red'}}> 
                        {(props.data.value>0)?'+'+props.data.value:props.data.value}
                    </Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default LedgerRowType2;