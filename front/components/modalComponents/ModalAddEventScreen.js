import React, {useEffect, useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {commonStyles} from '../../styles/styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {modalStyles} from "../../styles/modalWindowsStyle";
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell,} from 'react-native-confirmation-code-field';

export default function ModalWindow({isVisible, isCorrect, onClose, onSubmit}) {
    const CELL_COUNT = 5;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [isError, setError] = useState(true);
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const handleSubmit = async () => {
        console.log(value);
        await AsyncStorage.setItem('code', value);
        onSubmit();
        setValue('');
    };

    useEffect(() => {
        const error = !value;
        setError(error);
    }, [value]);

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
                        <Text style={modalStyles.title}>Enter the event code</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                        <FontAwesomeIcon icon={faCircleXmark} size={24}/>
                    </TouchableOpacity>
                    <Text style={modalStyles.modalText}>The event code is in the email or SMS you received.</Text>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={modalStyles.codeFieldRoot}
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[modalStyles.cell, isFocused && modalStyles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor/> : null)}
                            </Text>
                        )}
                    />
                    {isError && <Text style={[modalStyles.textError]}>* Fields cannot be empty!</Text>}
                    {!isError && !isCorrect && <Text style={modalStyles.textError}>* Incorrect code</Text>}
                    <TouchableOpacity onPress={handleSubmit} style={modalStyles.submitButton}>
                        <Text style={modalStyles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
