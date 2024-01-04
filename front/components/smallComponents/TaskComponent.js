import React, {useEffect, useState} from 'react';
import {Linking, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import {eventPageStyle} from '../../styles/EventPageStyle';
import {COLORS, FONTS} from "../../constants/theme";
import {getWishesByEventId} from "../../services/apiWishlist";
import Checkbox from 'expo-checkbox';
import {deleteTask, toggleStatusById, updateName} from '../../services/apiTasks';
import {faPencil, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {modalStyles} from "../../styles/modalWindowsStyle";
import {faTrashCan, faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {deleteEventByEventId} from "../../services/apiEvent";


export default function TaskComponent({task, setLoading, setShortLoading}) {
    const [toggleCheckBox, setToggleCheckBox] = useState(task.status && task.status.data && task.status.data[0] === 1);
    const [isModalChangeTask, setModalChangeTask] = useState(false);
    const [taskName, setTaskName] = useState('');

    const toggleStatus = () => {
        toggleStatusById(task.task_id);
        setToggleCheckBox(!toggleCheckBox);
        setShortLoading(true);
    };

    const handleDelete = () => {
        deleteTask(task.task_id);
        setModalChangeTask(false);
        setShortLoading(true);
    };

    const handleSubmit = () => {
        updateName(task.task_id, taskName);
        setModalChangeTask(false);
        setShortLoading(true);
    };

    const getPriorityStyle = priority => {
        switch (priority) {
            case 1:
                return { color: COLORS.red };
            case 2:
                return { color: COLORS.orange };
            default:
                return { color: COLORS.green };
        }
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 35}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 43}}>
                    <Checkbox
                        value={toggleCheckBox}
                        onValueChange={() => {toggleStatus()}}
                        color={toggleCheckBox ? COLORS.red : undefined}
                    />

                    <Text style={[eventPageStyle.textWishlist, getPriorityStyle(task.priority)]}>
                        {task.name}
                    </Text>
                </View>

                    <TouchableOpacity onPress={()=>{setModalChangeTask(!isModalChangeTask)}} style={{position: 'absolute', right: 5}}>
                        <FontAwesomeIcon icon={faPencil} size={24} style={{ color: COLORS.beaver }} />
                    </TouchableOpacity>
                    {isModalChangeTask && <TouchableOpacity onPress={handleDelete} style={{position: 'absolute', right: 35}}>
                        <FontAwesomeIcon icon={faTrashCan} size={24} style={{ color: COLORS.beaver }} />
                    </TouchableOpacity>}

            </View>
            {isModalChangeTask && <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-around', alignItems: 'center'}}>
                <View style={[modalStyles.input, {width: 250,}]}>
                    <TextInput
                        placeholder={'Enter text here ...'}
                        onChangeText={taskName => {
                            setTaskName(taskName);
                        }}
                        style={modalStyles.modalText}
                    />
                </View>
                <TouchableOpacity onPress={handleSubmit} style={{marginHorizontal:5}}>
                    <FontAwesomeIcon icon={faCheckCircle} size={38} style={{ color: COLORS.coral}} />
                </TouchableOpacity>
            </View>}
        </View>
    );
}
