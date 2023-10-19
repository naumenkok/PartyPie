import React, {useState} from 'react';
import {View, ImageBackground, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import { commonStyles } from '../styles/styles.js';
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../constants/theme";
import EventsItem from "../components/EventsItem";
import constants from "../constants/img";
import ModalWindow from "../components/ModalAddEventScreen";
import TabButton from "../components/TabButton";

export default function Events({navigation}) {
    const [isModalVisible, setModalVisible] = useState(false);
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
                <TabButton></TabButton>
            </View>
            <View style={commonStyles.eventsMiddle}>
                {/*<Image source={constants.picture}></Image>*/}
                {/*<Text style={[commonStyles.text, {color: COLORS.grey}]}>No events yet</Text>*/}
                <ScrollView>
                    <EventsItem
                        backgroundColor={COLORS.redcoral}
                        name={"Charlotte’s birthday party"}
                        date={"29.07.2023"}
                    ></EventsItem>

                    <EventsItem
                        backgroundColor={COLORS.orange}
                        name={"Gender Reveal Party"}
                        date={"15.08.2023"}
                    ></EventsItem>

                    <EventsItem
                        backgroundColor={COLORS.pink}
                        name={"Corporate event"}
                        date={"09.10.2023"}
                    ></EventsItem>

                    <EventsItem
                        backgroundColor={COLORS.red}
                        name={"Emily and Sam's Wedding"}
                        date={"05.05.2024"}
                    ></EventsItem>

                    <EventsItem
                        backgroundColor={COLORS.redcoral}
                        name={"Charlotte’s birthday party"}
                        date={"29.07.2023"}
                    ></EventsItem>
                </ScrollView>
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
