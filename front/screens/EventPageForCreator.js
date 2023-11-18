import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { eventPageStyle } from '../styles/EventPageStyle';
import constants from '../constants/img.js';
import {commonStyles} from "../styles/styles";
import Post from "../components/Post";
import {getEventByEventId} from "../services/apiEvent";
import {addPost, getPostsByEventId} from "../services/apiPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {postStyle} from "../styles/postStyle";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCamera, faCommentDots, faPaperPlane, faPencil} from "@fortawesome/free-solid-svg-icons";
import {COLORS} from "../constants/theme";
import {PacmanIndicator} from 'react-native-indicators';
import TopBar from "../components/TopBar";
import TopBarForCreator from "../components/TobBarForCreator";
import PostPageComponent from "../components/PostsPageComponent";
import HomePageComponent from "../components/HomeComponent";
import WishListComponent from "../components/WishListComponent";

export default function EventPageForCreator({navigation}) {
    const [event, setEvent] = useState({});
    const [isLongLoading, setIsLongLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Home');

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
            <ImageBackground source={constants.gradientBright} style={commonStyles.imageBackground} >
                <View style={eventPageStyle.eventPageTop}>
                    <View style={eventPageStyle.eventNameView}>
                        <TouchableOpacity onPress={()=>{}} style={eventPageStyle.closeButton}>
                            <FontAwesomeIcon icon={faPencil} size={24} style={{ color: COLORS.beaver }} />
                        </TouchableOpacity>
                        <Text style={eventPageStyle.eventName}>{event.name}</Text>
                    </View>
                </View>
                <View style={eventPageStyle.eventPageBottom}>
                    <ScrollView style={eventPageStyle.eventPageScroll}>
                        <View style={eventPageStyle.scrollBox1}>
                            <TopBarForCreator activeTab={activeTab} setActiveTab={setActiveTab} />
                        </View>
                        {activeTab==='Home' &&  <HomePageComponent event={event}/>}
                        {activeTab==='Posts' &&  <PostPageComponent/>}
                        {activeTab==='Todo' &&  <WishListComponent event={event}/>}
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }}
