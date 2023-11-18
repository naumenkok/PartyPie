import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Linking} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faLocationDot, faUserTie, faGift, faExclamation, faImages, faClock} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from "../constants/theme";
import {topBarStyle} from "../styles/topBarStyle";
import {eventPageStyle} from "../styles/EventPageStyle";
import {getDaysUntilEvent} from "../services/apiEvent";
import WishListComponent from "./WishListComponent";

export default function TopBar({ activeTab, setActiveTab, event }) {
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

    const getIconSize = (tabName) => {
        return (tabName=== activeTab) ? 20 : 35;
    };

    const getColor = (tabName) => {
        return (tabName === activeTab) ? COLORS.white : (
            (() => {
                switch (tabName) {
                    case 'Location':
                        return COLORS.pink;
                    case 'Tie':
                        return COLORS.orange;
                    case 'Exclamation':
                        return COLORS.red;
                    case 'Gift':
                        return COLORS.pink;
                    case 'Images':
                        return COLORS.orange;
                }
            })()
        );
    };

    const getBackgroundColor = (tabName) => {
        return (tabName != activeTab) ? COLORS.white : (
            (() => {
                switch (tabName) {
                    case 'Location':
                        return COLORS.pink;
                    case 'Tie':
                        return COLORS.orange;
                    case 'Exclamation':
                        return COLORS.red;
                    case 'Gift':
                        return COLORS.pink;
                    case 'Images':
                        return COLORS.orange;
                }
            })()
        );
    };

    const getTextStyle = (tabName) => {
        return (tabName=== activeTab) ? {fontSize: 16} : {fontSize: 12};
    };

    const handleLinkPress = () => {
        console.log(event.photo_link);
        Linking.openURL(event.photo_link);
    };

    return (
        <View>
            <View style={topBarStyle.container}>
                <TouchableOpacity onPress={()=>{setActiveTab('Location')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Location')}]}>
                    <FontAwesomeIcon icon={faLocationDot} size={getIconSize('Location')} style={{ color: getColor('Location') }} />
                    {activeTab === "Location" && <Text style={[topBarStyle.text, getTextStyle('Location')]}>Location</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setActiveTab('Tie'); console.log(event.dress_code)}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Tie')}]}>
                    <FontAwesomeIcon icon={faUserTie} size={getIconSize('Tie')} style={{ color: getColor('Tie') }} />
                    {activeTab === "Tie" && <Text style={[topBarStyle.text, getTextStyle('Tie')]}>Dress code</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setActiveTab('Exclamation')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Exclamation')}]}>
                    <FontAwesomeIcon icon={faExclamation} size={getIconSize('Exclamation')} style={{ color: getColor('Exclamation') }} />
                    {activeTab === "Exclamation" && <Text style={[topBarStyle.text, getTextStyle('Exclamation')]}> Details  </Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setActiveTab('Gift')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Gift')}]}>
                    <FontAwesomeIcon icon={faGift} size={getIconSize('Gift')} style={{ color: getColor('Gift') }} />
                    {activeTab === "Gift" && <Text style={[topBarStyle.text, getTextStyle('Gift')]}>Wishlist</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setActiveTab('Images')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Images')}]}>
                    <FontAwesomeIcon icon={faImages} size={getIconSize('Images')} style={{ color: getColor('Images') }} />
                    {activeTab === "Images" && <Text style={[topBarStyle.text, getTextStyle('Images')]}>Images</Text>}
                </TouchableOpacity>
            </View>
            {activeTab === "Location" && (
                <View style={[eventPageStyle.container, {borderColor: COLORS.pink, borderWidth: 5, height: 120}]}>
                    {(event.country || event.city || event.street) && (event.country !== '' || event.city !== '' || event.street !== '')
                        ? (
                        <View>
                            <View style={eventPageStyle.horizontal}>
                                <FontAwesomeIcon icon={faLocationDot} size={30} color={COLORS.red}/>
                                <Text style={[eventPageStyle.text, {color: COLORS.pink}]}>{event.street} {event.house}, {event.city}, {event.country}</Text>
                            </View>
                            <Text style={[eventPageStyle.text, {color: COLORS.red}]}>{event.date.split('T')[0]}</Text>
                        </View>):
                        (<View>
                            <Text style={[eventPageStyle.text, {color: COLORS.pink}]}>No location details yet :(</Text>
                        </View>)}
            </View>)}

            {activeTab === "Tie" && (
                <View style={[eventPageStyle.container, {borderColor: COLORS.orange, borderWidth: 5, height: 140}]}>
                    {event.dress_code !== null && event.dress_code !== '' ? (
                            <View>
                                <View style={eventPageStyle.horizontal}>
                                    <FontAwesomeIcon icon={faUserTie} size={30} color={COLORS.redorange}/>
                                    <Text style={[eventPageStyle.text, {color: COLORS.orange}]}>Dress code:</Text>
                                </View>
                                <Text style={[eventPageStyle.text, {color: COLORS.redorange}]}>{event.dress_code}</Text>
                                <View style={[eventPageStyle.horizontal, {justifyContent: 'space-between'}]}>
                                    <View style={[eventPageStyle.circle, {backgroundColor: `${event.color_1}`}]}/>
                                    <View style={[eventPageStyle.circle, {backgroundColor: `${event.color_2}`}]}/>
                                    <View style={[eventPageStyle.circle, {backgroundColor: `${event.color_3}`}]}/>
                                    <View style={[eventPageStyle.circle, {backgroundColor: `${event.color_4}`}]}/>
                                </View>
                            </View>):
                        (<View>
                            <Text style={[eventPageStyle.text, {color: COLORS.orange}]}>No dress code details yet :(</Text>
                        </View>)}
                </View>)}

            {activeTab === "Exclamation" && (
                <View style={[eventPageStyle.container, {borderColor: COLORS.red, borderWidth: 5, height: 70}]}>
                    {daysLeft >= 0 ? (
                            <View style={eventPageStyle.horizontal}>
                                <FontAwesomeIcon icon={faClock} size={30} color={COLORS.red}/>
                                <Text style={[eventPageStyle.text, {color: COLORS.red}]}>{daysLeft} days left!!!</Text>
                            </View>):
                        (<View>
                            <Text style={[eventPageStyle.text, {color: COLORS.red, paddingLeft: 0}]}>The event has already passed</Text>
                        </View>)}
                </View>)}

            {activeTab === "Gift" && (<View style={{marginBottom: 5}}>
                <WishListComponent event={event}/>
            </View>)}

            {activeTab === "Images" && (
                <View style={[eventPageStyle.container, {borderColor: COLORS.orange, borderWidth: 5, height: 120}]}>
                    {event.photo_link !== '' && event.photo_link !== null ? (
                            <View>
                                <View style={eventPageStyle.horizontal}>
                                    <FontAwesomeIcon icon={faImages} size={30} color={COLORS.orange}/>
                                    <Text style={[eventPageStyle.text, {color: COLORS.red}]}>Want to see our photo? </Text>
                                </View>
                                <Text style={[eventPageStyle.text, {color: COLORS.orange}]} onPress={handleLinkPress}>Click here!</Text>
                            </View>):
                        (<View>
                            <Text style={[eventPageStyle.text, {color: COLORS.orange}]}>No photo yet :(</Text>
                        </View>)}
                </View>)}
        </View>
    );
}