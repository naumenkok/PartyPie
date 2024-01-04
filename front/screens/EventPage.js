import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView, Text, View} from 'react-native';
import {eventPageStyle} from '../styles/EventPageStyle';
import constants from '../constants/img.js';
import {commonStyles} from "../styles/styles";
import {getEventByEventId} from "../services/apiEvent";
import {addPost, getPostsByEventId} from "../services/apiPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {COLORS} from "../constants/theme";
import {PacmanIndicator} from 'react-native-indicators';
import TopBar from "../components/TopBar";
import PostPageComponent from "../components/pageComponents/PostsPageComponent";

export default function EventPage({navigation}) {
    const [event, setEvent] = useState();
    const [isLongLoading, setIsLongLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Exclamation');
    const [post, setPost] = useState('');

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    useEffect(() => {
        const fetchData = async () => {
            await delay(2000);
            try {
                const eventId = await AsyncStorage.getItem('eventId');
                const event = await getEventByEventId(eventId);
                setEvent(event);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLongLoading(false);
            }
        };
        fetchData();
    }, [isLongLoading]);

    if (isLongLoading) {
        return (
            <View style={commonStyles.loadingView}>
                <PacmanIndicator color={COLORS.red} size={100}/>
                <Text style={{color: 'red'}}>Loading...</Text>
            </View>
        );
    } else {
        return (
            <ImageBackground source={constants.gradientBright} style={commonStyles.imageBackground}>
                <View style={eventPageStyle.eventPageTop}>
                    <View style={eventPageStyle.eventNameView}>
                        <Text style={eventPageStyle.eventName}>{event.name}</Text>
                    </View>
                </View>
                <View style={eventPageStyle.eventPageBottom}>
                    <ScrollView style={eventPageStyle.eventPageScroll}>
                        <TopBar activeTab={activeTab} setActiveTab={setActiveTab} event={event}/>
                        <PostPageComponent/>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}
