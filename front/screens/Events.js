import React, {useState, useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import { commonStyles } from '../styles/styles.js';
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../constants/theme";
import EventsItem from "../components/EventsItem";
import constants from "../constants/img";
import ModalWindow from "../components/ModalAddEventScreen";
import TabButton from "../components/TabButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFutureEvents, getPastEvents} from "../services/api";

export default function Events({navigation}) {
    const [activeTab, setActiveTab] = useState("Upcoming");
    const [isModalVisible, setModalVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const eventColors = [COLORS.redcoral, COLORS.orange, COLORS.pink, COLORS.red, COLORS.redcoral];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const events =  activeTab==="Upcoming"? await getFutureEvents(userId):await getPastEvents(userId);
                setEvents(events);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        const intervalId = setInterval(fetchData, 2000);
        return () => clearInterval(intervalId);
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
        <ImageBackground source={constants.gradientEvents} style={commonStyles.imageBackground}>
            <View style={commonStyles.eventsTop}>
                <Text style={[commonStyles.text, {color: COLORS.orange, fontSize:28}]}>I was invited:</Text>
                <View style={commonStyles.horizontal}>
                    <TabButton label="Upcoming" tabName="Upcoming"
                               activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <Text style={[commonStyles.text, { color: COLORS.red, fontSize: 24 }]}>|</Text>
                    <TabButton label="Past" tabName="Past"
                               activeTab={activeTab} setActiveTab={setActiveTab} />
                </View>
            </View>
            <View style={commonStyles.eventsMiddle}>
                {events.length > 0 ? (
                    <ScrollView>
                        {events.map((event, index) => (
                            <EventsItem
                                backgroundColor={eventColors[index % eventColors.length]}
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
