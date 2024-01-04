import React, {useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {commonStyles} from '../../../styles/styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {modalStyles} from "../../../styles/modalWindowsStyle";
import {updateEventInfo, updateEventName} from "../../../services/apiEvent";
import {COLORS} from "../../../constants/theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ModalChangeInfo({event, isVisible, setVisible, onClose, setLoading}) {
    const [country, setCountry] = useState(event.country);
    const [city, setCity] = useState(event.city);
    const [street, setStreet] = useState(event.street);
    const [house, setHouse] = useState(event.house);
    const [date, setDate] = useState(event.date);
    const [selectedDate, setSelectedDate] = useState(new Date(date));
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const handleSubmit = async () => {
        const eventId = event.event_id;
        await updateEventInfo(eventId, country, city, street, house, selectedDate.toISOString().split('T')[0]);
        setVisible(false);
        setLoading(true);
    };

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        //setDate(date);
        hideDatePicker();
    };

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
                        <Text style={modalStyles.title}>Enter country</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                        <FontAwesomeIcon icon={faCircleXmark} size={24}/>
                    </TouchableOpacity>

                    <Text style={modalStyles.modalText}>Country:</Text>
                    <View style={[modalStyles.input, {marginVertical:0, height: 50}]}>
                    <TextInput
                        value={country}
                        onChangeText={country => {
                            setCountry(country);
                        }}
                        style={modalStyles.modalText}
                    />
                    </View>
                    <Text style={modalStyles.modalText}>City:</Text>
                    <View style={[modalStyles.input, {marginVertical:0, height: 50}]}>
                    <TextInput
                        value={city}
                        onChangeText={city => {
                            setCity(city);
                        }}
                        style={modalStyles.modalText}
                    />
                    </View>
                    <Text style={modalStyles.modalText}>Street:</Text>
                    <View style={[modalStyles.input, {marginVertical:0, height: 50}]}>
                    <TextInput
                        value={street}
                        onChangeText={street => {
                            setStreet(street);
                        }}
                        style={modalStyles.modalText}
                    />
                    </View>
                    <Text style={modalStyles.modalText}>House:</Text>
                    <View style={[modalStyles.input, {marginVertical:0, height: 50}]}>
                    <TextInput
                        value={house}
                        onChangeText={house => {
                            setHouse(house);
                        }}
                        style={modalStyles.modalText}
                    />
                    </View>

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

                    {/*{!isCorrect && <Text style={modalStyles.textError}>* Incorrect code</Text>}*/}
                    <TouchableOpacity onPress={handleSubmit} style={modalStyles.submitButton}>
                        <Text style={modalStyles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
