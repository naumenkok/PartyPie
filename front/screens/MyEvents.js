import React, {useState} from 'react';
import {Image, ImageBackground, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import { commonStyles } from '../styles/styles.js';
import constants from '../constants/img.js';
import {COLORS} from "../constants/theme";
import {LinearGradient} from "expo-linear-gradient";
import EventsItem from "../components/EventsItem";

export default function MyEvents({navigation}) {
    const [activeTab, setActiveTab] = useState('Upcoming');

    const TabButton = ({ label, tabName }) => {
        const isActive = activeTab === tabName;
        return (
            <TouchableOpacity onPress={() => setActiveTab(tabName)}>
                <Text
                    style={[
                        commonStyles.text,
                        {
                            color: isActive ? COLORS.red : COLORS.beaver,
                            fontSize: 24,
                        },
                    ]}
                >
                    {label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground source={constants.gradientProfileLight} style={commonStyles.imageBackground}>
            <View style={commonStyles.eventsTop}>
                <Text style={[commonStyles.text, {color: COLORS.orange, fontSize:28}]}>I invite:</Text>
                <View style={commonStyles.horizontal}>
                    <TabButton label="Upcoming" tabName="Upcoming" />
                    <Text style={[commonStyles.text, {color: COLORS.red, fontSize:24}]}>|</Text>
                    <TabButton label="   Past    " tabName="Past"/>
                </View>
            </View>
            <View style={commonStyles.eventsMiddle}>
                <Image source={constants.picture}></Image>
                <Text style={[commonStyles.text, {color: COLORS.pinkdark}]}>No events yet</Text>
                {/*<ScrollView>*/}
                {/*    <EventsItem*/}
                {/*        backgroundColor={COLORS.white}*/}
                {/*        textColor={COLORS.green}*/}
                {/*        name={"Charlotte’s birthday party"}*/}
                {/*        date={"29.07.2023"}*/}
                {/*    ></EventsItem>*/}

                {/*    <EventsItem*/}
                {/*        backgroundColor={COLORS.white}*/}
                {/*        textColor={COLORS.orange}*/}
                {/*        name={"Gender Reveal Party"}*/}
                {/*        date={"15.08.2023"}*/}
                {/*    ></EventsItem>*/}

                {/*    <EventsItem*/}
                {/*        backgroundColor={COLORS.white}*/}
                {/*        textColor={COLORS.pink}*/}
                {/*        name={"Corporate event"}*/}
                {/*        date={"09.10.2023"}*/}
                {/*    ></EventsItem>*/}

                {/*    <EventsItem*/}
                {/*        backgroundColor={COLORS.white}*/}
                {/*        textColor={COLORS.red}*/}
                {/*        name={"Emily and Sam's Wedding"}*/}
                {/*        date={"05.05.2024"}*/}
                {/*    ></EventsItem>*/}

                {/*    <EventsItem*/}
                {/*        backgroundColor={COLORS.white}*/}
                {/*        textColor={COLORS.green}*/}
                {/*        name={"Charlotte’s birthday party"}*/}
                {/*        date={"29.07.2023"}*/}
                {/*    ></EventsItem>*/}
                {/*</ScrollView>*/}
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


