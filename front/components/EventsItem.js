import React from 'react';
import {View, Text} from "react-native";
import { itemStyle } from '../styles/eventsListItemStyle';

export default function EventsItem({ backgroundColor, textColor, name, date }) {
    const commonStyles = itemStyle({ backgroundColor, textColor });
    return(
        <View style={commonStyles.eventItem}>
            <Text style={commonStyles.textEventsName}>{name}</Text>
            <Text style={commonStyles.textEventsDate}>{date}</Text>
        </View>
    );
}