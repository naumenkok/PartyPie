import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot, faUserTie, faGift, faClock, faImages } from '@fortawesome/free-solid-svg-icons';
import {COLORS} from "../constants/theme";
import {topBarStyle} from "../styles/topBarStyle";

export default function TopBar({ activeTab, setActiveTab }) {

    const getIconSize = (tabName) => {
        return (tabName=== activeTab) ? 20 : 35;
    };

    const getColor = (tabName) => {
        return (tabName === activeTab) ? COLORS.white : (
            (() => {
                switch (tabName) {
                    case 'Location':
                        return COLORS.pink;
                    case 'Tie':
                        return COLORS.orange;
                    case 'Clock':
                        return COLORS.red;
                    case 'Gift':
                        return COLORS.pink;
                    case 'Images':
                        return COLORS.orange;
                }
            })()
        );
    };

    const getBackgroundColor = (tabName) => {
        return (tabName != activeTab) ? COLORS.white : (
            (() => {
                switch (tabName) {
                    case 'Location':
                        return COLORS.pink;
                    case 'Tie':
                        return COLORS.orange;
                    case 'Clock':
                        return COLORS.red;
                    case 'Gift':
                        return COLORS.pink;
                    case 'Images':
                        return COLORS.orange;
                }
            })()
        );
    };

    const getTextStyle = (tabName) => {
        return (tabName=== activeTab) ? {fontSize: 16} : {fontSize: 12};
    };

    return (
        <View style={topBarStyle.container}>
            <TouchableOpacity onPress={()=>{setActiveTab('Location')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Location')}]}>
                <FontAwesomeIcon icon={faLocationDot} size={getIconSize('Location')} style={{ color: getColor('Location') }} />
                {activeTab === "Location" && <Text style={[topBarStyle.text, getTextStyle('Location')]}>Location</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setActiveTab('Tie')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Tie')}]}>
                <FontAwesomeIcon icon={faUserTie} size={getIconSize('Tie')} style={{ color: getColor('Tie') }} />
                {activeTab === "Tie" && <Text style={[topBarStyle.text, getTextStyle('Tie')]}>Dress code</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setActiveTab('Clock')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Clock')}]}>
                <FontAwesomeIcon icon={faClock} size={getIconSize('Clock')} style={{ color: getColor('Clock') }} />
                {activeTab === "Clock" && <Text style={[topBarStyle.text, getTextStyle('Clock')]}>Days left</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setActiveTab('Gift')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Gift')}]}>
                <FontAwesomeIcon icon={faGift} size={getIconSize('Gift')} style={{ color: getColor('Gift') }} />
                {activeTab === "Gift" && <Text style={[topBarStyle.text, getTextStyle('Gift')]}>Wishlist</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setActiveTab('Images')}} style={[topBarStyle.button, {backgroundColor:getBackgroundColor('Images')}]}>
                <FontAwesomeIcon icon={faImages} size={getIconSize('Images')} style={{ color: getColor('Images') }} />
                {activeTab === "Images" && <Text style={[topBarStyle.text, getTextStyle('Images')]}>Images</Text>}
            </TouchableOpacity>
        </View>
    );
}