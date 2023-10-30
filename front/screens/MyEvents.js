import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, View, TouchableOpacity, Text, ScrollView, PanResponder} from 'react-native';
import { commonStyles } from '../styles/styles.js';
import constants from '../constants/img.js';
import {COLORS} from "../constants/theme";
import {LinearGradient} from "expo-linear-gradient";
import EventsItem from "../components/EventsItem";
import TabButton from "../components/TabButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMyPastEvents, getMyFutureEvents} from "../services/api";
import Skeleton from "../components/Skeleton";

export default function MyEvents({navigation}) {
    const [activeTab, setActiveTab] = useState("Upcoming");
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
            const events =  activeTab==="Upcoming"? await getMyFutureEvents(userId):await getMyPastEvents(userId);
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
            </View>
            <View style={commonStyles.eventsBottom}>
                <View>
                    <LinearGradient
                        colors={['#FF6D4B', '#FF6059', '#FFC247', '#DCF500']}
                        style={commonStyles.buttonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('Events')}
                        >
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





