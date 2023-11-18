import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faEnvelope, faListCheck, faSackDollar, faUserGroup, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import {COLORS} from "../constants/theme";
import {topBarStyle} from "../styles/topBarStyle";

export default function TopBarForCreator({ activeTab, setActiveTab }) {

    const getIconSize = (tabName) => {
        return (tabName=== activeTab) ? 20 : 30;
    };

    const getColor = (tabName) => {
        return (tabName === activeTab) ? COLORS.white : (
            (() => {
                switch (tabName) {
                    case 'Home':
                        return COLORS.pink;
                    case 'Posts':
                        return COLORS.orange;
                    case 'Todo':
                        return COLORS.red;
                    case 'Budget':
                        return COLORS.pink;
                    case 'Users':
                        return COLORS.orange;
                    case 'Inspiration':
                        return COLORS.red;
                }
            })()
        );
    };

    const getBackgroundColor = (tabName) => {
        return (tabName != activeTab) ? COLORS.white : (
            (() => {
                switch (tabName) {
                    case 'Home':
                        return COLORS.pink;
                    case 'Posts':
                        return COLORS.orange;
                    case 'Todo':
                        return COLORS.red;
                    case 'Budget':
                        return COLORS.pink;
                    case 'Users':
                        return COLORS.orange;
                    case 'Inspiration':
                        return COLORS.red;
                }
            })()
        );
    };

    const getTextStyle = (tabName) => {
        return (tabName=== activeTab) ? {fontSize: 16} : {fontSize: 12};
    };

    return (
        <View style={topBarStyle.container}>
            <TouchableOpacity onPress={()=>{setActiveTab('Home')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Home')}]}>
                <FontAwesomeIcon icon={faHome} size={getIconSize('Home')} style={{ color: getColor('Home') }} />
                {activeTab === "Home" && <Text style={[topBarStyle.text, getTextStyle('Home')]}>Details</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setActiveTab('Posts')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Posts')}]}>
                <FontAwesomeIcon icon={faEnvelope} size={getIconSize('Posts')} style={{ color: getColor('Posts') }} />
                {activeTab === "Posts" && <Text style={[topBarStyle.text, getTextStyle('Posts')]}>Posts</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setActiveTab('Todo')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Todo')}]}>
                <FontAwesomeIcon icon={faListCheck} size={getIconSize('Todo')} style={{ color: getColor('Todo') }} />
                {activeTab === "Todo" && <Text style={[topBarStyle.text, getTextStyle('Todo')]}> ToDo  </Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setActiveTab('Budget')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Budget')}]}>
                <FontAwesomeIcon icon={faSackDollar} size={getIconSize('Budget')} style={{ color: getColor('Budget') }} />
                {activeTab === "Budget" && <Text style={[topBarStyle.text, getTextStyle('Budget')]}>Budget</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setActiveTab('Users')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Users')}]}>
                <FontAwesomeIcon icon={faUserGroup} size={getIconSize('Users')} style={{ color: getColor('Users') }} />
                {activeTab === "Users" && <Text style={[topBarStyle.text, getTextStyle('Users')]}>Guests</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setActiveTab('Inspiration')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Inspiration')}]}>
                <FontAwesomeIcon icon={faLightbulb} size={getIconSize('Inspiration')} style={{ color: getColor('Inspiration') }} />
                {activeTab === "Inspiration" && <Text style={[topBarStyle.text, getTextStyle('Inspiration')]}>Ideas</Text>}
            </TouchableOpacity>
        </View>
    );
}