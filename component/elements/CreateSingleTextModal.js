import React from 'react'
import { Modal, View, TouchableOpacity, Text, TextInput } from 'react-native'

const CreateSingleTextModal = (props)=>
{
    return (
        <Modal visible={props.display} transparent={true} onRequestClose={()=>props.setDisplay(false)}>
            <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                <TouchableOpacity style={{width:'100%',minHeight:230}} onPress={()=>props.setDisplay(false)}></TouchableOpacity>
                
                <View style={{minHeight:300,maxHeight:300,width:'90%',backgroundColor:'white',borderWidth:1,borderRadius:20,alignItems:'center'}}>
                    
                    <Text style={{fontSize:20,fontWeight:'bold',marginTop:'5%'}}>CREATE TOPIC</Text>
                    <View style={{width:'100%',height:'5%',borderBottomWidth:1,marginBottom:'10%'}}></View>
                    <TextInput style={{paddingLeft:20,fontSize:20,width:'80%',borderWidth:1,borderRadius:20,
                        height:'25%',marginBottom:'5%'}} onChangeText={(e)=>props.setText(e)} 
                        value={props.text} />
                    <TouchableOpacity style={{borderWidth:1,width:'60%',minHeight:50,borderRadius:20,
                        justifyContent:'center',alignItems:'center',backgroundColor:'black'}} activeOpacity={0.7}
                        onPress={()=>{
                            props.createText();
                            props.setDisplay(false);
                        }}>
                        <Text style={{fontSize:18,color:'white'}}>CREATE</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={{width:'100%',minHeight:230}} onPress={()=>props.setDisplay(false)}></TouchableOpacity>
            </View>
        </Modal>
    )
}

export default CreateSingleTextModal;