import React, {useEffect, useState} from 'react';
import {Linking, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {eventPageStyle} from '../styles/EventPageStyle';
import {COLORS, FONTS} from "../constants/theme";
import {getWishesByEventId} from "../services/apiWishlist";
import Checkbox from 'expo-checkbox';
import {toggleStatusById} from '../services/apiWishlist';
import WishComponent from "./smallComponents/WishComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {commonStyles} from "../styles/styles";
import {PacmanIndicator} from "react-native-indicators";
import {modalStyles} from "../styles/modalWindowsStyle";
import {SelectList} from "react-native-dropdown-select-list";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import {addWish} from "../services/apiWishlist";
import {addTask} from "../services/apiTasks";


export default function WishListComponent({event, screen}) {
    const [wishes, setWishes] = useState([]);
    const [userId, setUserId] = useState('');
    const [isModalAddWish, setModalAddWish] = useState(false);
    const [wishName, setWishName] = useState('');
    const [wishLink, setWishLink] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const wishes = await getWishesByEventId(event.event_id);
                setWishes(wishes);
                const userId = await AsyncStorage.getItem('userId');
                setUserId(userId);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [isLoading]);

    useEffect(() => {
        const error = !wishName;
        setError(error);
    }, [wishName]);

    const handleSubmit = () => {
        addWish(event.event_id, wishName, wishLink);
        setModalAddWish(false);
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
        <View style={eventPageStyle.containerWishlist}>
            {wishes.length > 0 ? (
                wishes.map((wish, index) => (
                    <View key={index} style={{alignSelf:'stretch'}}>
                        <WishComponent wish={wish} setLoading={setLoading} userId={userId} screen={screen}/>
                    </View>
                ))
            ) : (
                <Text style={[eventPageStyle.text, {color: COLORS.pink}]}>No wishes yet :(</Text>
            )}
            {screen === "Guest" ? null : (
                <>
                <View style={eventPageStyle.button}>
                    <TouchableOpacity onPress={() => {
                        setModalAddWish(!isModalAddWish);
                    }}>
                        <View style={commonStyles.horizontal}>
                            <Text style={[commonStyles.text, {fontSize: 24, color: COLORS.red}]}>Add new</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {isModalAddWish && (
                    <View style={eventPageStyle.addTask}>
                        <View style={[modalStyles.input, {borderColor: 'transparent'}]}>
                            <TextInput
                                placeholder={'Add name here ...'}
                                onChangeText={wishName => {
                                    setWishName(wishName);
                                }}
                                style={modalStyles.modalText}
                            />
                        </View>
                        <View style={[modalStyles.input, {borderColor: 'transparent'}]}>
                            <TextInput
                                placeholder={'Add link here ...'}
                                onChangeText={wishLink => {
                                    setWishLink(wishLink);
                                }}
                                style={modalStyles.modalText}
                            />
                        </View>

                        {isError && <Text style={modalStyles.textError}>* Fields cannot be empty!</Text>}
                        <TouchableOpacity onPress={handleSubmit} style={modalStyles.submitButton}>
                            <Text style={modalStyles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
                </>
            )}
        </View>
    );
}}