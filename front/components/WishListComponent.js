import React, {useEffect, useState} from 'react';
import {Linking, Text, View} from 'react-native';
import {eventPageStyle} from '../styles/EventPageStyle';
import {COLORS} from "../constants/theme";
import {getWishesByEventId} from "../services/apiWishlist";
import Checkbox from 'expo-checkbox';
import {toggleStatusById} from '../services/apiWishlist';
import WishComponent from "./WishComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function WishListComponent({event}) {
    const [wishes, setWishes] = useState([]);
    const [userId, setUserId] = useState([]);
    const [isLoading, setLoading] = useState(false);

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

    return (
        <View style={eventPageStyle.containerWishlist}>
            {wishes.length > 0 ? (
                wishes.map((wish, index) => (
                    <View key={index}>
                        <WishComponent wish={wish} setLoading={setLoading} userId={userId}/>
                    </View>
                ))
            ) : (
                <Text style={[eventPageStyle.text, {color: COLORS.pink}]}>No wishes yet :(</Text>
            )}
        </View>
    );
}
