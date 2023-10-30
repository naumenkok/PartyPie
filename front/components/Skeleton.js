import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native'
import { BlurView } from 'expo-blur';
import {LinearGradient} from "expo-linear-gradient";
import {View, Text} from "react-native";
import { itemStyle } from '../styles/eventsListItemStyle';
import {COLORS} from "../constants/theme";

export default function Skeleton() {
    const backgroundColor = COLORS.pinkdark;
    const commonStyles = itemStyle({backgroundColor});
    return(
        <View style={commonStyles.eventItem}>
            <BlurView intensity={60} tint="light" style={commonStyles.blur}>
                <ContentLoader foregroundColor={COLORS.pinkdark}>
                    <Rect x="5" y="5" rx="6" ry="6" width="200" height="30"/>
                    <Rect x="140" y="50" rx="6" ry="6" width="170" height="25"/>
                </ContentLoader>
            </BlurView>
        </View>
    );
}

