import React, {useEffect, useState} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {eventPageStyle} from '../../styles/EventPageStyle';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faClock, faImages, faLightbulb, faLocationDot, faPencil, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {COLORS} from "../../constants/theme";
import {getDaysUntilEvent} from "../../services/apiEvent";
import ModalChangeLink from "../modalComponents/modalWindowsForChanges/ModalChangeLink";
import ModalChangeInfo from "../modalComponents/modalWindowsForChanges/ModalChangeInfo";

export default function HomePageComponent({event, setLoading}) {
    const [daysLeft, setDaysLeft] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalLinkVisible, setModalLinkVisible] = useState(false);
    const inspiration_link =
        event.type === "Birthday"
            ? "https://www.pinterest.com/search/pins/?rs=ac&len=2&q=birthday%20party%20aesthetic&eq=Birthday%20party%20a&etslf=5190"
            : event.type === "Home party"
                ? "https://www.pinterest.com/search/pins/?q=Home%20party%20aesthetic&rs=typed"
                : event.type === "Corporate event"
                    ? "https://www.pinterest.com/search/pins/?q=Corporate%20event%20ideas&rs=typed"
                    : event.type === "Wedding"
                        ? "https://www.pinterest.com/search/pins/?q=Wedding%20aesthetic&rs=typed"
                        : event.type === "Workshops"
                            ? "https://www.pinterest.com/search/pins/?q=Workshops%20aesthetic&rs=typed"
                            : event.type === "Hosting"
                                ? "https://www.pinterest.com/search/pins/?rs=ac&len=2&q=hosting%20party%20aesthetic&eq=hosting%20party%20aest&etslf=7974"
                                : event.type === "Stag/Hen Party"
                                    ? "https://www.pinterest.com/search/pins/?q=Stag%2FHen%20Party%20aesthetic&rs=typed"
                                    : "https://www.pinterest.com/search/pins/?q=party%20aesthetic&rs=typed";


    useEffect(() => {
        const fetchData = async () => {
            try {
                const days = await getDaysUntilEvent(event.event_id);
                console.log("data: ", days)
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
                <TouchableOpacity onPress={() => {
                    setModalVisible(true)
                }} style={eventPageStyle.closeButton}>
                    <FontAwesomeIcon icon={faPencil} size={24} style={{color: COLORS.beaver}}/>
                </TouchableOpacity>
                {(event.country || event.city || event.street) && (event.country !== '' || event.city !== '' || event.street !== '')
                    ? (
                        <View>
                            <View style={eventPageStyle.horizontal}>
                                <FontAwesomeIcon icon={faLocationDot} size={30} color={COLORS.green}/>
                                <Text
                                    style={eventPageStyle.text}>{event.street} {event.house}, {event.city} {event.country}</Text>
                            </View>
                            <Text style={eventPageStyle.text}>{event.date.split('T')[0]}</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={[eventPageStyle.text, {color: COLORS.green}]}>No details yet</Text>
                        </View>)
                }
            </View>
            <View style={[eventPageStyle.container, {borderColor: COLORS.orange, height: 70}]}>
                {daysLeft !== 0 ? (
                    daysLeft > 0 ? (
                        <View style={eventPageStyle.horizontal}>
                            <FontAwesomeIcon icon={faClock} size={30} color={COLORS.orange}/>
                            <Text style={[eventPageStyle.text, {color: COLORS.orange}]}>
                                {daysLeft} days left!!!
                            </Text>
                        </View>
                    ) : (
                        <Text style={[eventPageStyle.text, {color: COLORS.orange, paddingLeft: 0}]}>
                            The event has already passed
                        </Text>
                    )
                ) : (
                    <Text style={[eventPageStyle.text, {color: COLORS.orange, paddingLeft: 0}]}>
                        {event.name} is today!!!
                    </Text>
                )}
            </View>
            <View style={[eventPageStyle.container, {borderColor: COLORS.pink}]}>
                <TouchableOpacity onPress={() => {
                }} style={eventPageStyle.closeButton}>
                    <FontAwesomeIcon icon={faPencil} size={24} style={{color: COLORS.beaver}}/>
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
                    </View>) : (<View>
                    <Text style={[eventPageStyle.text, {color: COLORS.pink}]}>No dress code details yet</Text>
                </View>)}
            </View>
            <View style={[eventPageStyle.container, {borderColor: COLORS.red, height: 120}]}>
                <TouchableOpacity onPress={() => {
                    setModalLinkVisible(true)
                }} style={eventPageStyle.closeButton}>
                    <FontAwesomeIcon icon={faPencil} size={24} style={{color: COLORS.beaver}}/>
                </TouchableOpacity>
                <View style={eventPageStyle.horizontal}>
                    <FontAwesomeIcon icon={faImages} size={30} color={COLORS.red}/>
                    {event.photo_link ?
                        (<Text style={[eventPageStyle.text, {color: COLORS.red}]}>Your photo album:</Text>)
                        :
                        (<Text style={[eventPageStyle.text, {color: COLORS.red}]}>No photo album yet</Text>)}
                </View>
                <Text style={[eventPageStyle.text, {color: COLORS.redcoral, fontSize: 17, paddingLeft: 0}]}
                      onPress={handleLinkPress}>{event.photo_link}</Text>
            </View>
            <View style={[eventPageStyle.container, {marginTop: 7, height: 100}]}>
                <TouchableOpacity onPress={() => {
                    Linking.openURL(inspiration_link);
                }} style={eventPageStyle.horizontal}>
                    <FontAwesomeIcon icon={faLightbulb} size={30} color={COLORS.green}/>
                    <Text style={eventPageStyle.text}>Check out some inspiration</Text>
                </TouchableOpacity>
            </View>
            <ModalChangeInfo
                event={event}
                isVisible={isModalVisible}
                setVisible={setModalVisible}
                onClose={() => setModalVisible(false)}
                setLoading={setLoading}
            />
            <ModalChangeLink
                event={event}
                isVisible={isModalLinkVisible}
                setVisible={setModalLinkVisible}
                onClose={() => setModalLinkVisible(false)}
                setLoading={setLoading}
            />
        </View>
    );
}
