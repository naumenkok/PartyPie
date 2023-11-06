import React, {useState, useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, Text, ScrollView, PanResponder} from 'react-native';
import { commonStyles } from '../styles/styles.js';
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../constants/theme";
import EventsItem from "../components/EventsItem";
import constants from "../constants/img";
import ModalWindow from "../components/ModalAddEventScreen";
import TabButton from "../components/TabButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {authenticateUser, getFutureEvents, getMyFutureEvents, getMyPastEvents, getPastEvents} from "../services/api";
import Skeleton from "../components/Skeleton";

export default function Events({navigation}) {
    const [activeTab, setActiveTab] = useState("Upcoming");
    const [isModalVisible, setModalVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [panResponder, setPanResponder] = useState(null);
    const eventColors = [COLORS.redcoral, COLORS.orange, COLORS.pink, COLORS.red, COLORS.redcoral];

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const fetchData = async () => {
        setLoading(true);
        await delay(2000);
        try {
            const userId = await AsyncStorage.getItem('userId');
            const events =  activeTab==="Upcoming"? await getFutureEvents(userId):await getPastEvents(userId);
            setEvents(events);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    useEffect(() => {
        setPanResponder(
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderRelease: (e, gestureState) => {
                    if (gestureState.dy > 50) {
                        fetchData();
                    }
                },
            })
        );
    }, [activeTab]);


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSubmit = () => {
        //
        closeModal();
    };

    return (
        <ImageBackground source={constants.gradientEvents} style={commonStyles.imageBackground} >
            <View style={commonStyles.eventsTop} {...panResponder?.panHandlers}>
                <Text style={[commonStyles.text, {color: COLORS.orange, fontSize:28}]}>I was invited:</Text>
                <View style={commonStyles.horizontal}>
                    <TabButton label="Upcoming" tabName="Upcoming"
                               activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <Text style={[commonStyles.text, { color: COLORS.red, fontSize: 24 }]}>|</Text>
                    <TabButton label="Past" tabName="Past"
                               activeTab={activeTab} setActiveTab={setActiveTab} />
                </View>
            </View>
            <View style={commonStyles.eventsMiddle} {...panResponder?.panHandlers}>
                {isLoading ? (
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
                                    ></EventsItem>
                                ))}

                            </ScrollView>
                ):(
                    <Text style={[commonStyles.text, {color: COLORS.pinkdark,
                        backgroundColor: 'rgba(255, 255, 255, 0.85)', top: 30,
                    }]}>No events yet</Text>
                )}
                <ModalWindow
                    isVisible={isModalVisible}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                />
            </View>
            <View style={commonStyles.eventsBottom}>
                <View>
                    <LinearGradient
                        colors={['#FF6D4B', '#FF6059', '#FFC247', '#DCF500']}
                        style={commonStyles.buttonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <TouchableOpacity onPress={openModal}>
                            <View style={commonStyles.horizontal}>
                                <Text style={[commonStyles.text, {fontSize:24}]}>Add new</Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </ImageBackground>
    );
}
