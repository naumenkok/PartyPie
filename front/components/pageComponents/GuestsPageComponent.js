import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {eventPageStyle} from '../../styles/EventPageStyle';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {COLORS, FONTS} from "../../constants/theme";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import {addTask, getAllTasks} from "../../services/apiTasks";
import TaskComponent from "../smallComponents/TaskComponent";
import {commonStyles} from "../../styles/styles";
import {PacmanIndicator} from "react-native-indicators";
import {modalStyles} from "../../styles/modalWindowsStyle";
import {SelectList} from "react-native-dropdown-select-list";
import {deleteEventByEventId} from "../../services/apiEvent";
import GuestComponent from "../smallComponents/GuestComponent";
import {getGuestsByEventId} from "../../services/apiUser";

export default function GuestsPageComponent({event}) {
    const [guests, setGuests] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const guests = await getGuestsByEventId(event.event_id);
                setGuests(guests);
                console.log(event.event_id);
                console.log(guests);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    return (
        <ScrollView style={eventPageStyle.scrollBox3}>
            <View style={[eventPageStyle.containerWishlist, {borderColor: COLORS.orange}]}>
                {guests.length > 0 ?
                    (guests.map((guest, index) => (
                        <View key={index} style={{alignSelf: 'stretch'}}>
                            <GuestComponent guest={guest} event_id={event.event_id}/>
                        </View>))) : (
                        <Text style={[eventPageStyle.text, {color: COLORS.orange}]}>No guests yet :(</Text>)}
            </View>
        </ScrollView>
    );
}
