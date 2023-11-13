import React, {useState, useEffect} from 'react';
import {ImageBackground, View, TouchableOpacity, Text, ScrollView, PanResponder} from 'react-native';
import { commonStyles } from '../styles/styles.js';
import constants from '../constants/img.js';
import {COLORS} from "../constants/theme";
import {LinearGradient} from "expo-linear-gradient";
import EventsItem from "../components/EventsItem";
import TabButton from "../components/TabButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMyPastEvents, getMyFutureEvents, deleteEventByEventId} from "../services/api";
import Skeleton from "../components/Skeleton";
import ModalCreateEvent from "../components/ModalCreateEvent";
import ModalDelete from "../components/ModalDelete";

export default function MyEvents({navigation}) {
    const [activeTab, setActiveTab] = useState("Upcoming");
    const [events, setEvents] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isLongLoading, setLongLoading] = useState(true);
    const [panResponder, setPanResponder] = useState(null);
    const eventColors = [COLORS.redcoral, COLORS.orange, COLORS.pink, COLORS.red, COLORS.redcoral];

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const fetchData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const events =  activeTab==="Upcoming"? await getMyFutureEvents(userId):await getMyPastEvents(userId);
            setEvents(events);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEvents = async () => {
        setLongLoading(true);
        await delay(2000);
        try {
            await fetchData;
        } catch (error) {
            console.error(error);
        } finally {
            setLongLoading(false);
        }
    };


    useEffect(() => {
        (async () => {
            try {
                await fetchEvents();
            } catch (error) {
                console.error('error', error);
            }
        })();
    }, [activeTab]);

    useEffect(() => {
        (async () => {
            try {
                await fetchData();
            } catch (error) {
                console.error('error', error);
            } finally {
                setLoading(false);
            }
        })();
    }, [activeTab, isLoading]);


    useEffect(() => {
        setPanResponder(
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderRelease: (e, gestureState) => {
                    if (gestureState.dy > 50) {
                        (async () => {
                            try {
                                await fetchEvents();
                            } catch (error) {
                                console.error('error', error);
                            }
                        })();
                    }
                },
            })
        );
    },[]);

    const handleSubmit = () => {
        //
        setModalVisible(false);
    };

    const handleDelete = async () => {
        try {
            await onDelete();
            setModalDeleteVisible(false);
            setLoading(true);
        } catch (error) {
            console.error('error', error);
        }
    };

    const onDelete = async () => {
        try {
            const eventIdForDelete = await AsyncStorage.getItem('eventIdForDelete');
            const response = await deleteEventByEventId(eventIdForDelete);
            console.log('deleted', response);
        } catch (error) {
            console.error('error', error);
        }
    };

    return (
        <ImageBackground source={constants.gradientMyEvents} style={commonStyles.imageBackground}>
            <View style={commonStyles.eventsTop} {...panResponder?.panHandlers}>
                <Text style={[commonStyles.text, {color: COLORS.orange, fontSize:28}]}>I invite:</Text>
                <View style={commonStyles.horizontal}>
                    <TabButton label="Upcoming" tabName="Upcoming"
                        activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <Text style={[commonStyles.text, { color: COLORS.red, fontSize: 24 }]}>|</Text>
                    <TabButton label="Past" tabName="Past"
                        activeTab={activeTab} setActiveTab={setActiveTab} />
                </View>
            </View>
            <View style={commonStyles.eventsMiddle} {...panResponder?.panHandlers}>
                {isLongLoading ? (
                    <ScrollView>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </ScrollView>
                ):events.length > 0 ? (
                <ScrollView>
                    {events.map((event, index) => (
                        <EventsItem
                            key={index}
                            navigation = {navigation}
                            backgroundColor={eventColors[index % eventColors.length]}
                            event_id={event.event_id}
                            name={event.name}
                            date={event.date}
                            isModalVisible={isModalDeleteVisible}
                            setModalVisible={setModalDeleteVisible}
                        ></EventsItem>
                    ))}
                    <ModalCreateEvent
                        isVisible={isModalVisible}
                        onClose={() => setModalVisible(false)}
                        onSubmit={handleSubmit}
                        setLoading={setLoading}
                    />
                    <ModalDelete
                        isVisible={isModalDeleteVisible}
                        onClose={() => setModalDeleteVisible(false)}
                        onSubmit={handleDelete}
                    />
                </ScrollView>
                    ):(
                <Text style={[commonStyles.text, {color: COLORS.pinkdark,
                    backgroundColor: 'rgba(255, 255, 255, 0.85)', top: 30,
                }]}>No events yet</Text>
                    )}
            </View>
            <View style={commonStyles.eventsBottom}>
                <View>
                    <LinearGradient
                        colors={['#FF6D4B', '#FF6059', '#FFC247', '#DCF500']}
                        style={commonStyles.buttonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={commonStyles.horizontal}>
                                <Text style={[commonStyles.text, {fontSize:24}]}>create new</Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </ImageBackground>
    );
}





