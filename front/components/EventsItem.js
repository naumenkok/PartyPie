import React from 'react';
import {View, Text} from "react-native";
import { itemStyle } from '../styles/eventsListItemStyle';
import { BlurView } from 'expo-blur';
import {LinearGradient} from "expo-linear-gradient";

export default function EventsItem({ backgroundColor, name, date }) {
    const commonStyles = itemStyle({ backgroundColor});
    return(
        <View style={commonStyles.eventItem}>
            <BlurView intensity={60} tint="light" style={commonStyles.blur}>
                <LinearGradient colors={['rgba(255,255,255,0.2)', "rgba(255,255,255,0.0)"]}
                                start={{x:0, y:1}}
                                end={{x:1, y:1}}
                                useAngle
                                angle={110}
                                style={commonStyles.gradient}
                >
                    <Text style={commonStyles.textEventsName}>{name}</Text>
                    <Text style={commonStyles.textEventsDate}>{date}</Text>
                </LinearGradient>
            </BlurView>
        </View>
    );
}