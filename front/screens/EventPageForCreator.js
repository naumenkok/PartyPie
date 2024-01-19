import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Text, ScrollView, TouchableOpacity} from 'react-native';
import { eventPageStyle } from '../styles/EventPageStyle';
import constants from '../constants/img.js';
import {commonStyles} from "../styles/styles";
import {getEventByEventId} from "../services/apiEvent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import {COLORS} from "../constants/theme";
import {PacmanIndicator} from 'react-native-indicators';
import TopBarForCreator from "../components/TobBarForCreator";
import PostPageComponent from "../components/pageComponents/PostsPageComponent";
import HomePageComponent from "../components/pageComponents/HomePageComponent";
import TodoPageComponent from "../components/pageComponents/TodoPageComponent";
import BudgetPageComponent from "../components/pageComponents/BudgetPageComponent";
import ModalWindow from "../components/modalComponents/ModalAddEventScreen";
import ModalChangeName from "../components/modalComponents/modalWindowsForChanges/ModalChangeName";
import WishListComponent from "../components/WishListComponent";
import GuestsPageComponent from "../components/pageComponents/GuestsPageComponent";

export default function EventPageForCreator({navigation}) {
    const [event, setEvent] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
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
                setLoading(false);
            }
        };
        fetchData();
    }, [isLongLoading, isLoading]);

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
                        <TouchableOpacity onPress={()=>{setModalVisible(true)}} style={eventPageStyle.closeButton}>
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
                        {activeTab==='Home' &&  <HomePageComponent event={event} setLoading={setLoading}/>}
                        {activeTab==='Posts' &&  <PostPageComponent/>}
                        {activeTab==='Todo' &&  <TodoPageComponent event={event}/>}
                        {activeTab==='Budget' &&  <BudgetPageComponent event={event}/>}
                        {activeTab==='Users' &&  <GuestsPageComponent event={event}/>}
                        {activeTab==='Wishlist' &&  <WishListComponent event={event}/>}
                    </ScrollView>
                </View>
                <ModalChangeName
                    event={event}
                    isVisible={isModalVisible}
                    setVisible={setModalVisible}
                    onClose={() => setModalVisible(false)}
                    setLoading={setLoading}
                />
            </ImageBackground>
        );
    }}
