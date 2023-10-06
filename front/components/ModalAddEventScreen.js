import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import { commonStyles } from '../styles/styles.js';
import {modalStyles} from "../styles/modalWindowsStyle";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {COLORS} from "../constants/theme";

export default function ModalWindow ({ isVisible, onClose, onSubmit }) {
    const CELL_COUNT = 5;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

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
                        <Text style={modalStyles.title}>Enter the event ID</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                        <FontAwesomeIcon icon={faCircleXmark} size={24}/>
                    </TouchableOpacity>
                    <Text style={modalStyles.modalText}>The Event ID is in the email or SMS you received.</Text>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={modalStyles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[modalStyles.cell, isFocused && modalStyles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                    <TouchableOpacity onPress={onSubmit} style={modalStyles.submitButton}>
                        <Text style={modalStyles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
