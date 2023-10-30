import React, {useState, useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, Text, ScrollView, PanResponder} from 'react-native';
import { eventPageStyle } from '../styles/EventPageStyle';
import constants from '../constants/img.js';
import {commonStyles} from "../styles/styles";

export default function EventPage({navigation}) {

    return (
        <ImageBackground source={constants.gradientBright} style={commonStyles.imageBackground} >
            <View style={eventPageStyle.eventPageTop}>
                <View style={eventPageStyle.eventNameView}>
                    <Text style={eventPageStyle.eventName}>Gender Reveal Partybgfn fgnjfdnfhg</Text>
                </View>
            </View>
            <View style={eventPageStyle.eventPageBottom}>
                <ScrollView style={eventPageStyle.eventPageScroll}>
                    <View style={eventPageStyle.scrollBox1}></View>
                    <View style={eventPageStyle.scrollBox2}></View>
                    <View style={eventPageStyle.scrollBox3}></View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}
