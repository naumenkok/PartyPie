import React, {useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {commonStyles} from '../../../styles/styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {modalStyles} from "../../../styles/modalWindowsStyle";
import {addGuest} from "../../../services/api";
import {updateEventLink, updateEventName} from "../../../services/apiEvent";

export default function ModalChangeName({event, isVisible, setVisible, onClose, setLoading}) {
    const [value, setValue] = useState(event.link);

    const handleSubmit = async () => {
        console.log(value);
        const eventId = await AsyncStorage.getItem('eventId');
        console.log(eventId);
        await updateEventLink(eventId, value);
        setLoading(true);
        setVisible(false);
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
                        <Text style={modalStyles.title}>Enter new link</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                        <FontAwesomeIcon icon={faCircleXmark} size={24}/>
                    </TouchableOpacity>
                    <TextInput
                        placeholder={"enter here:"}
                        value={value}
                        onChangeText={name => {
                            setValue(name);
                        }}
                        style={[modalStyles.modalText, {marginVertical: 15}]}
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
