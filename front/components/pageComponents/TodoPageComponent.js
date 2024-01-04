import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {eventPageStyle} from '../../styles/EventPageStyle';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {COLORS, FONTS} from "../../constants/theme";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import {addTask, getAllTasks} from "../../services/apiTasks";
import TaskComponent from "../smallComponents/TaskComponent";
import {commonStyles} from "../../styles/styles";
import {PacmanIndicator} from "react-native-indicators";
import {modalStyles} from "../../styles/modalWindowsStyle";
import {SelectList} from "react-native-dropdown-select-list";
import {deleteEventByEventId} from "../../services/apiEvent";

export default function TodoPageComponent({event}) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isShortLoading, setShortLoading] = useState(true);
    const [isModalAddTask, setModalAddTask] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [selectedPriority, setSelectedPriority] = useState(3);
    const data = [
        {key:'1', value:'high', },
        {key:'2', value:'medium'},
        {key:'3', value:'low'},
    ]


    useEffect(() => {
        const fetchData = async () => {
            try {
                var tasks = await getAllTasks(event.event_id);
                tasks.sort((a, b) => (a.priority || Infinity) - (b.priority || Infinity));
                setTasks(tasks);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                setShortLoading(false);
            }
        };
        fetchData();
    }, [isLoading, isShortLoading]);

    const handleSubmit = () => {
        addTask(event.event_id, taskName, selectedPriority);
        setModalAddTask(false);
        setLoading(true);
    };

    if (isLoading) {
        return (
            <View style={[commonStyles.loadingView, {backgroundColor: 'transparent'}]}>
                <PacmanIndicator color={COLORS.red} size={100}/>
                <Text style={{color: 'red'}}>Loading...</Text>
            </View>
        );
    } else {
        return (
            <ScrollView style={eventPageStyle.scrollBox3}>
                <View style={eventPageStyle.containerWishlist}>
                    {tasks.length > 0 ?
                        (tasks.map((task) => (
                                <View key={task.task_id} style={{alignSelf: 'stretch'}}>
                                    <TaskComponent task={task} setLoading={setLoading}
                                                   setShortLoading={setShortLoading}/>
                                </View>))) : (
                        <Text style={[eventPageStyle.text, {color: COLORS.pink}]}>No tasks yet :(</Text>
                        )}
                    <View style={eventPageStyle.button}>
                        <TouchableOpacity onPress={() => {
                            setModalAddTask(!isModalAddTask)
                        }}>
                            <View style={commonStyles.horizontal}>
                                <Text style={[commonStyles.text, {fontSize: 24, color: COLORS.red}]}>Add new</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {isModalAddTask && (
                        <View style={eventPageStyle.addTask}>
                            <View style={[modalStyles.input, {borderColor: 'transparent'}]}>
                                <TextInput
                                    placeholder={'Add task here ...'}
                                    onChangeText={taskName => {
                                        setTaskName(taskName);
                                    }}
                                    style={modalStyles.modalText}
                                />
                            </View>
                            <View style={eventPageStyle.containerTask}>
                                <SelectList
                                    setSelected={(val) => setSelectedPriority(val)}
                                    fontFamily= {FONTS.regular}
                                    data={data}
                                    placeholder = "Priority:"
                                    boxStyles={[{width: 150}]}
                                />
                                <TouchableOpacity onPress={handleSubmit} style={{marginHorizontal: 5}}>
                                    <FontAwesomeIcon icon={faCheckCircle} size={38} style={{color: COLORS.orange}}/>
                                </TouchableOpacity>
                        </View>
                        </View>)}
                    <View style={{flexDirection: 'row', alignSelf: 'flex-start', marginTop: 25}}>
                        <Text style={[eventPageStyle.textWishlist, {fontSize: 15, color: COLORS.beaver}]}>
                            Colors of priority:
                        </Text>
                        <Text style={[eventPageStyle.textWishlist, {fontSize: 15, color: COLORS.red}]}>
                            high
                        </Text>
                        <Text style={[eventPageStyle.textWishlist, {fontSize: 15, color: COLORS.orange}]}>
                            medium
                        </Text>
                        <Text style={[eventPageStyle.textWishlist, {fontSize: 15, color: COLORS.green}]}>
                            low
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
