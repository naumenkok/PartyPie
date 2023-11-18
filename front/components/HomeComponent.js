import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Linking} from 'react-native';
import {eventPageStyle} from '../styles/EventPageStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faLocationDot, faUserTie, faGift, faImages, faClock, faPencil} from "@fortawesome/free-solid-svg-icons";
import {COLORS} from "../constants/theme";
import {getDaysUntilEvent, getEventByEventId} from "../services/apiEvent";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";

export default function HomePageComponent({ event }) {
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const days =  await getDaysUntilEvent(event.event_id);
                setDaysLeft(days);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleLinkPress = () => {
        Linking.openURL(event.photo_link);
    };

    return (
        <View style={eventPageStyle.scrollBox3}>
            <View style={eventPageStyle.container}>
                <TouchableOpacity onPress={()=>{}} style={eventPageStyle.closeButton}>
                    <FontAwesomeIcon icon={faPencil} size={24} style={{ color: COLORS.beaver }} />
                </TouchableOpacity>
                {(event.country || event.city || event.street) && (event.country !== '' || event.city !== '' || event.street !== '')
                    ? (
                        <View>
                            <View style={eventPageStyle.horizontal}>
                                <FontAwesomeIcon icon={faLocationDot} size={30} color={COLORS.green}/>
                                <Text style={eventPageStyle.text}>{event.street} {event.house}, {event.city} {event.country}</Text>
                            </View>
                            <Text style={eventPageStyle.text}>{event.date.split('T')[0]}</Text>
                        </View>
                    ):(
                        <View>
                            <Text style={[eventPageStyle.text, {color: COLORS.green}]}>No location details yet</Text>
                        </View>)
                }
            </View>
            <View style={[eventPageStyle.container, {borderColor: COLORS.orange, height: 70}]}>
                <TouchableOpacity onPress={()=>{}} style={eventPageStyle.closeButton}>
                    <FontAwesomeIcon icon={faPencil} size={24} style={{ color: COLORS.beaver }} />
                </TouchableOpacity>
                {daysLeft >= 0 ? (
                    <View style={eventPageStyle.horizontal}>
                        <FontAwesomeIcon icon={faClock} size={30} color={COLORS.orange}/>
                        <Text style={[eventPageStyle.text, {color: COLORS.orange}]}>{daysLeft} days left!!!</Text>
                    </View>):(
                    <Text style={[eventPageStyle.text, {color: COLORS.orange, paddingLeft: 0}]}>The event has already passed</Text>
                )}
            </View>
            <View style={[eventPageStyle.container, {borderColor: COLORS.pink}]}>
                <TouchableOpacity onPress={()=>{}} style={eventPageStyle.closeButton}>
                    <FontAwesomeIcon icon={faPencil} size={24} style={{ color: COLORS.beaver }} />
                </TouchableOpacity>
                {event.dress_code !== null && event.dress_code !== '' ? (
                    <View>
                        <View style={eventPageStyle.horizontal}>
                            <FontAwesomeIcon icon={faUserTie} size={30} color={COLORS.pink}/>
                            <Text style={[eventPageStyle.text, {color: COLORS.pink}]}>Dress code:</Text>
                        </View>
                        <Text style={[eventPageStyle.text, {color: COLORS.pink}]}>{event.dress_code}</Text>
                        <View style={[eventPageStyle.horizontal, {justifyContent: 'space-evenly'}]}>
                            <View style={[eventPageStyle.circle, {backgroundColor: `${event.color_1}`}]}/>
                            <View style={[eventPageStyle.circle, {backgroundColor: `${event.color_2}`}]}/>
                            <View style={[eventPageStyle.circle, {backgroundColor: `${event.color_3}`}]}/>
                            <View style={[eventPageStyle.circle, {backgroundColor: `${event.color_4}`}]}/>
                        </View>
                    </View>):(<View>
                    <Text style={[eventPageStyle.text, {color: COLORS.pink}]}>No dress code details yet</Text>
                </View>)}
            </View>
            <View style={[eventPageStyle.container, {borderColor: COLORS.red, height: 120}]}>
                <TouchableOpacity onPress={()=>{}} style={eventPageStyle.closeButton}>
                    <FontAwesomeIcon icon={faPencil} size={24} style={{ color: COLORS.beaver }} />
                </TouchableOpacity>
                <View style={eventPageStyle.horizontal}>
                    <FontAwesomeIcon icon={faImages} size={30} color={COLORS.red}/>
                    <Text style={[eventPageStyle.text, {color: COLORS.red}]}>Check your photo album:</Text>
                </View>
                <Text style={[eventPageStyle.text, {color: COLORS.redcoral, fontSize: 17, paddingLeft: 0}]} onPress={handleLinkPress}>{event.photo_link}</Text>
            </View>
            <View style={[eventPageStyle.container, {height: 70}]}>
                <View style={eventPageStyle.horizontal}>
                    <FontAwesomeIcon icon={faGift} size={30} color={COLORS.green}/>
                    <Text style={eventPageStyle.text}>Check your wishlist</Text>
                </View>
            </View>
        </View>
    );
}
