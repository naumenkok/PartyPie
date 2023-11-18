import React, {useState, useEffect} from 'react';
import {Modal, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {commonStyles} from '../styles/styles.js';
import {modalStyles} from "../styles/modalWindowsStyle";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {COLORS} from "../constants/theme";
import TypeList from "./TypeList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createNewEvent} from "../services/apiEvent";


export default function ModalCreateEvent({isVisible, onClose, setLoading}) {
    const [eventName, setEventName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [isError, setError] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const handleCreateEvent = async () => {
        const creator_id = await AsyncStorage.getItem('userId');
        if (isError) {
            return;
        }
        const eventData = {
            creator_id: creator_id,
            name: eventName,
            type: selectedType,
            date: selectedDate.toISOString().split('T')[0]
        };

        try {
            const response = await createNewEvent(eventData);
            console.log('Successfully created:', response);
            onClose();
        } catch (error) {
            console.error('Error in createNewEvent:', error);
        } finally {
            setLoading(true);
        }
    };

    useEffect(() => {
        const error = !eventName || !selectedType || !selectedDate;
        setError(error);
    }, [eventName, selectedType]);


    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={modalStyles.modalContainer}>
                <View style={modalStyles.modalContent}>
                    <View style={commonStyles.horizontal}>
                        <Text style={modalStyles.title}>Create new event</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                        <FontAwesomeIcon icon={faCircleXmark} size={24}/>
                    </TouchableOpacity>
                    <View style={modalStyles.input}>
                        <TextInput
                            placeholder={'Enter event name ...'}
                            onChangeText={eventName => {
                                setEventName(eventName);
                            }}
                            style={modalStyles.modalText}
                        />
                    </View>
                    <TypeList setSelected={setSelectedType}/>
                    <View style={modalStyles.button}>
                        <Text style={modalStyles.modalText}>{selectedDate.toDateString()}</Text>
                    </View>
                    <TouchableOpacity onPress={showDatePicker} style={[modalStyles.input, modalStyles.inputSmall]}>
                        <Text style={[modalStyles.modalText, {color: COLORS.beaver}]}>Select a date</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        date={selectedDate}
                        isVisible={datePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    {isError && <Text style={modalStyles.textError}>* Fields cannot be empty!</Text>}
                    <TouchableOpacity onPress={handleCreateEvent} style={modalStyles.submitButton}>
                        <Text style={modalStyles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
