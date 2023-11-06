import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import { itemStyle } from '../styles/eventsListItemStyle';
import { BlurView } from 'expo-blur';
import {LinearGradient} from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EventsItem({ navigation, backgroundColor, event_id, name, date }) {
    const commonStyles = itemStyle({ backgroundColor});

    const openEventPage = async (eventId) => {
        try {
            await AsyncStorage.setItem('eventId', eventId.toString());
            console.log("saved eventId");
            navigation.navigate('EventPage');
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <TouchableOpacity style={commonStyles.eventItem} onPress={() => openEventPage(event_id)}>
            <BlurView intensity={60} tint="light" style={commonStyles.blur}>
                <LinearGradient colors={['rgba(255,255,255,0.2)', "rgba(255,255,255,0.0)"]}
                                start={{x:0, y:1}}
                                end={{x:1, y:1}}
                                useAngle
                                angle={110}
                                style={commonStyles.gradient}
                >
                    <Text style={commonStyles.textEventsName}>{name}</Text>
                    <Text style={commonStyles.textEventsDate}>{date}</Text>
                </LinearGradient>
            </BlurView>
        </TouchableOpacity>
    );
}