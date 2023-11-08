import React from 'react';
import {ImageBackground, View, TouchableOpacity, Text, TextInput, Image, Platform} from 'react-native';
import { commonStyles } from '../styles/styles.js';
import constants from '../constants/img.js';
import { BlurView } from 'expo-blur';
import {COLORS} from "../constants/theme";

export default function Profile({navigation}) {
    return (
        <ImageBackground source={constants.gradientEvents} style={commonStyles.imageBackground}>
            <View style={commonStyles.profileTop}>

                <View style={[commonStyles.buttonProfile, {width: 300}]}>
                    <BlurView intensity={30} tint="light" style={[commonStyles.blur]}>
                    <Text style={commonStyles.name}>charlotte tilbury</Text>
                    </BlurView>
                </View>
            </View>
            <View style={commonStyles.profileBottom}>
                <View style={[commonStyles.buttonProfile, commonStyles.buttonProfileLogOut]}>
                    <TouchableOpacity
                         // onPress={() => ()}
                    >
                        <Text style={[commonStyles.text, {fontSize:16,color:COLORS.greendark}]}>Log out</Text>
                    </TouchableOpacity>
                </View>
                <View style={commonStyles.horizontal}>
                    <View style={[commonStyles.buttonProfile, {borderColor:COLORS.redorange}]}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LogIn')}
                        >
                            <Text style={[commonStyles.text, commonStyles.textButton, {color:COLORS.redorange}]}>Personal data</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[commonStyles.buttonProfile, {borderColor:COLORS.redorange}]}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LogIn')}
                        >
                            <Text style={[commonStyles.text, commonStyles.textButton, {color:COLORS.redorange}]}>Change data</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={commonStyles.horizontal}>
                    <View style={commonStyles.buttonProfile}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('TabNavigator', { screen: 'Events' });
                        }}>
                            <Text style={[commonStyles.text, commonStyles.textButton]}>Incoming events</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={commonStyles.buttonProfile}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('TabNavigator', { screen: 'MyEvents' });
                        }}>
                            <Text style={[commonStyles.text, commonStyles.textButton]}>Outgoing events</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}


