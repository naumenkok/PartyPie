import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import { itemStyle } from '../../styles/eventsListItemStyle';
import { BlurView } from 'expo-blur';
import {LinearGradient} from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {COLORS} from "../../constants/theme";
import {authenticateUser} from "../../services/apiUser";

export default function EventsItem({ navigation, backgroundColor, event_id, name, date, isModalVisible, setModalVisible}) {
    const itemStyles = itemStyle({ backgroundColor});

    const openEventPage = async (eventId) => {
        try {
            await AsyncStorage.setItem('eventId', eventId.toString());
            console.log("saved eventId");
            setModalVisible && navigation.navigate('EventPageForCreator');
            !setModalVisible && navigation.navigate('EventPage');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await AsyncStorage.setItem('eventIdForDelete', event_id.toString());
            setModalVisible(true);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <TouchableOpacity style={itemStyles.eventItem} onPress={() => openEventPage(event_id)}>
            <BlurView intensity={60} tint="light" style={itemStyles.blur}>
                <LinearGradient colors={['rgba(255,255,255,0.2)', "rgba(255,255,255,0.0)"]}
                                start={{x:0, y:1}}
                                end={{x:1, y:1}}
                                useAngle
                                angle={110}
                                style={itemStyles.gradient}
                >
                    <View>
                        <Text style={itemStyles.textEventsName}>{name}</Text>
                        {setModalVisible &&
                            <TouchableOpacity onPress={handleDelete} style={itemStyles.closeButton}>
                                <FontAwesomeIcon icon={faTrashCan} size={24} style={{ color: COLORS.beaver }} />
                            </TouchableOpacity>
                        }
                    </View>
                    <Text style={itemStyles.textEventsDate}>{date.split('T')[0]}</Text>
                </LinearGradient>
            </BlurView>
        </TouchableOpacity>
    );
}