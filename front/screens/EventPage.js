import React, {useState, useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, Text, ScrollView, PanResponder} from 'react-native';
import { eventPageStyle } from '../styles/EventPageStyle';
import constants from '../constants/img.js';
import {commonStyles} from "../styles/styles";
import Post from "../components/Post";
import {getEventByEventId, getPostsByEventId} from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventsItem from "../components/EventsItem";
import {COLORS} from "../constants/theme";

export default function EventPage({navigation}) {
    const [event, setEvent] = useState();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    useEffect(() => {
        const fetchData = async () => {
            await delay(2000);
            try {
                const eventId = await AsyncStorage.getItem('eventId');
                const event =  await getEventByEventId(eventId);
                setEvent(event);
                console.log(event);
                const posts =  await getPostsByEventId(eventId);
                setPosts(posts);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <View style={commonStyles.empty}>
                <Text>Loading...</Text>
            </View>
        );
    } else {
    return (
        <ImageBackground source={constants.gradientBright} style={commonStyles.imageBackground} >
            <View style={eventPageStyle.eventPageTop}>
                <View style={eventPageStyle.eventNameView}>
                    <Text style={eventPageStyle.eventName}>{event.name}</Text>
                </View>
            </View>
            <View style={eventPageStyle.eventPageBottom}>
                <ScrollView style={eventPageStyle.eventPageScroll}>
                    <View style={eventPageStyle.scrollBox1}></View>
                    <View style={eventPageStyle.scrollBox2}></View>
                    <View style={eventPageStyle.scrollBox3}>
                        {posts.length > 0 ? (posts.map((post, index) => (
                            <Post
                                key={index}
                                post_id={post.post_id}
                                user_id={post.user_id}
                                text={post.text}
                                post_date={post.date}
                            />
                        ))):(<Text>No posts to display.</Text>)}
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}}
