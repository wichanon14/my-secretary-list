import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateTask, DeleteTask } from '../../database'
import TaskCreatedModal from './TaskCreatedModal';

const TaskCard = (props) =>
{
    const [iconName,setIconName] = useState("circle");
    const [showMenu,setShowMenu] = useState(false);
    const [showTaskCreatedModal,setShowTaskCreatedModal] = useState(false);
    const db = useSelector(state=>state.database.connection);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(props.data.complete)
            setIconName("check-circle")
        else
            setIconName("circle")

    },[props.data.complete])

    const completeTask = (data)=>
    {
        data.complete = (data.complete)?0:1;
        UpdateTask(db,data,dispatch);
    }

    const deleteTask = (data)=>
    {
        Alert.alert(
            "Warning","Are you sure?",
            [
                {
                    text:"Yes",
                    onPress:()=>DeleteTask(db,data,dispatch)
                },
                {
                    text:"No"
                }
            ]
        )
        
        setShowMenu(false)
    }

    return(
        <TouchableOpacity activeOpacity={0.5}
            onPress={()=>completeTask(props.data)} onLongPress={()=>setShowMenu(true)}>
            <View style={[style.CardArea,{opacity:(props.data.complete)?0.2:1}]}>
                <Icon name={iconName} regular size={20} color="black" >
                    <View style={{width:10}}></View>
                    <Text style={style.Message}>{props.data.task_name}</Text>
                </Icon>
                <Menu opened={showMenu} onBackdropPress={()=>setShowMenu(false)} renderer={RoundedContextMenu} >
                    <MenuTrigger/>
                    <MenuOptions customStyles={optionsStyles} style={{margin:'8%'}} >
                        <MenuOption style={{padding:'5%',borderBottomWidth:1}} onSelect={() => [setShowTaskCreatedModal(true),setShowMenu(false)]} text="Edit" />
                        <MenuOption onSelect={() => deleteTask(props.data)}>
                            <Text style={{ color: 'red' }}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
            {
                showTaskCreatedModal && <TaskCreatedModal date={new Date(props.data.date)} 
                    setShow={setShowTaskCreatedModal} show={showTaskCreatedModal} data={props.data}/>
            }
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    CardArea:{
        minHeight:60,
        width:'80%',
        borderRadius:15,
        marginLeft:'10%',
        marginTop:'5%',
        justifyContent:'center',
        padding:'5%',
        backgroundColor:'#FFFF'
    },
    Message:{
        fontSize:15,
        flexWrap:'wrap'
    }
})

// menu option style
const optionsStyles = {
    optionsContainer: {
        borderRadius:20,
    },optionTouchable: {
        underlayColor: 'red',
        activeOpacity: 100,
    }
};


// menu component
const RoundedContextMenu = (props)=>
{
    
    const { style, children, layouts, ...other } = props;
    const position = computePosition(layouts);

    return (
        <View {...other} style={[roundedStyles, style, position]} >
            {children}
        </View>
    );
}
const { computePosition } = renderers.ContextMenu;
const roundedStyles = {
    backgroundColor: '#f7f7f7',
    borderRadius: 30,
    width:'50%',
    marginLeft:'25%'
}

export default TaskCard;