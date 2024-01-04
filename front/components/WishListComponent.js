import React, {useEffect, useState} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {eventPageStyle} from '../styles/EventPageStyle';
import {COLORS} from "../constants/theme";
import {getWishesByEventId} from "../services/apiWishlist";
import Checkbox from 'expo-checkbox';
import {toggleStatusById} from '../services/apiWishlist';
import WishComponent from "./smallComponents/WishComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {commonStyles} from "../styles/styles";
import {PacmanIndicator} from "react-native-indicators";


export default function WishListComponent({event, screen}) {
    const [wishes, setWishes] = useState([]);
    const [userId, setUserId] = useState('');
    const [isLoading, setLoading] = useState(true);

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
            <View style={eventPageStyle.button}>
                <TouchableOpacity onPress={() => {
                    setModalAddTask(!isModalAddTask)
                }}>
                    <View style={commonStyles.horizontal}>
                        <Text style={[commonStyles.text, {fontSize: 24, color: COLORS.red}]}>Add new</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}}
