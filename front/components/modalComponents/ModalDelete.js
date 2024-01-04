import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import { commonStyles } from '../../styles/styles.js';
import {modalStyles} from "../../styles/modalWindowsStyle";
import {COLORS} from "../../constants/theme";

export default function ModalDelete ({ isVisible, onClose, onSubmit }) {
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
                        <Text style={modalStyles.title}>Confirm deletion</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                        <FontAwesomeIcon icon={faCircleXmark} size={24}/>
                    </TouchableOpacity>
                    <Text style={modalStyles.modalText}>Are you sure you want to delete an event?</Text>
                    <View style={commonStyles.horizontal}>
                        <TouchableOpacity onPress={onSubmit} style={modalStyles.submitButton}>
                            <Text style={modalStyles.submitButtonText}>YES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={modalStyles.submitButton}>
                            <Text style={modalStyles.submitButtonText}>NO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
