import React, {useState} from 'react';
import {View, TouchableOpacity, Text, ImageBackground} from 'react-native';
import { commonStyles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGift, faFaceSmile, faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import {COLORS} from "../constants/theme";
import constants from "../constants/img";

export default function BottomTabBar() {
    const tabNavigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Events');

    const getIconSize = (tabName) => {
        return (tabName=== activeTab) ? 30 : 20;
    };

    const getTextStyle = (tabName) => {
        return (tabName=== activeTab) ? {fontSize: 16} : {fontSize: 12};
    };

    const getColor = (tabName) => {
        switch (tabName) {
            case 'Events':
                return COLORS.orange;
            case 'MyEvents':
                return COLORS.red;
            case 'Profile':
                return COLORS.greendark;
        }
    };

    const getSource = (tabName) => {
        switch (tabName) {
            case 'Events':
                return constants.arrow;
            case 'MyEvents':
                return constants.gradientLight;
            case 'Profile':
                return constants.gradientProfileLight;
        }
    };

    const navigateTo = (screen) => {
        tabNavigation.navigate('TabNavigator', { screen });
        setActiveTab(screen);
    };

    return (
        <ImageBackground source={getSource(activeTab)}>
            <View style={[commonStyles.bottomTabBar, { backgroundColor: getColor(activeTab) }]}>
                <TouchableOpacity onPress={() => navigateTo('Events')} style={commonStyles.tabBarItem}>
                    <FontAwesomeIcon icon={faGift} size={getIconSize('Events')} style={{ color: 'white' }} />
                    <Text style={[commonStyles.tabBarText, getTextStyle('Events')]}>Incoming events</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateTo('MyEvents')} style={commonStyles.tabBarItem}>
                    <FontAwesomeIcon icon={faCakeCandles} size={getIconSize('MyEvents')} style={{ color: 'white' }} />
                    <Text style={[commonStyles.tabBarText, getTextStyle('MyEvents')]}>Outgoing Events</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateTo('Profile')} style={commonStyles.tabBarItem}>
                    <FontAwesomeIcon icon={faFaceSmile} size={getIconSize('Profile')} style={{ color: 'white' }} />
                    <Text style={[commonStyles.tabBarText, getTextStyle('Profile')]}>Profile</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}