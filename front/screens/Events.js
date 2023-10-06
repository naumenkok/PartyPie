import React, {useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import { commonStyles } from '../styles/styles.js';
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../constants/theme";
import EventsItem from "../components/EventsItem";
import constants from "../constants/img";
import ModalWindow from "../components/ModalAddEventScreen";

export default function Events({navigation}) {
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSubmit = () => {
        // Tutaj możesz obsłużyć logikę po naciśnięciu przycisku "Submit" w modalnym oknie
        // Na przykład, możesz wykonać zapis danych i zamknąć modal.
        closeModal();
    };

    const TabButton = ({label, tabName}) => {
        const isActive = activeTab === tabName;
        return(
            <TouchableOpacity onPress={() => setActiveTab(tabName)}>
                <Text style={[commonStyles.text,
                    {
                        color: isActive ? COLORS.red : COLORS.beaver,
                        fontSize: 24,
                    },
                ]}> {label}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={commonStyles.viewBackground}>
            <View style={commonStyles.eventsTop}>
                <Text style={[commonStyles.text, {color: COLORS.orange, fontSize:28}]}>I was invited:</Text>
                <View style={commonStyles.horizontal}>
                    <TabButton label="Upcoming" tabName="Upcoming"></TabButton>
                    <Text style={[commonStyles.text, {color: COLORS.red, fontSize:24}]}>|</Text>
                    <TabButton label="   Past    " tabName="Past"></TabButton>
            </View>
            </View>
            <View style={commonStyles.eventsMiddle}>
                <Image source={constants.picture}></Image>
                <Text style={[commonStyles.text, {color: COLORS.grey}]}>No events yet</Text>
                {/*<ScrollView>*/}
                {/*    <EventsItem*/}
                {/*        backgroundColor={COLORS.green}*/}
                {/*        textColor={COLORS.white}*/}
                {/*        name={"Charlotte’s birthday party"}*/}
                {/*        date={"29.07.2023"}*/}
                {/*    ></EventsItem>*/}

                {/*    <EventsItem*/}
                {/*        backgroundColor={COLORS.orange}*/}
                {/*        textColor={COLORS.white}*/}
                {/*        name={"Gender Reveal Party"}*/}
                {/*        date={"15.08.2023"}*/}
                {/*    ></EventsItem>*/}

                {/*    <EventsItem*/}
                {/*        backgroundColor={COLORS.pink}*/}
                {/*        textColor={COLORS.white}*/}
                {/*        name={"Corporate event"}*/}
                {/*        date={"09.10.2023"}*/}
                {/*    ></EventsItem>*/}

                {/*    <EventsItem*/}
                {/*        backgroundColor={COLORS.red}*/}
                {/*        textColor={COLORS.white}*/}
                {/*        name={"Emily and Sam's Wedding"}*/}
                {/*        date={"05.05.2024"}*/}
                {/*    ></EventsItem>*/}

                {/*    <EventsItem*/}
                {/*        backgroundColor={COLORS.green}*/}
                {/*        textColor={COLORS.white}*/}
                {/*        name={"Charlotte’s birthday party"}*/}
                {/*        date={"29.07.2023"}*/}
                {/*    ></EventsItem>*/}
                {/*</ScrollView>*/}
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
        </View>
    );
}
