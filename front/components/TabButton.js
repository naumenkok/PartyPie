import React, {useState} from 'react';
import {View, TouchableOpacity, Text, } from 'react-native';
import { commonStyles } from '../styles/styles';
import {COLORS} from "../constants/theme";

export default function TabButton() {
    const [activeTab, setActiveTab] = useState('Upcoming');
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

    return(
        <View style={commonStyles.horizontal}>
            <TabButton label="Upcoming" tabName="Upcoming" />
            <Text style={[commonStyles.text, {color: COLORS.red, fontSize:24}]}>|</Text>
            <TabButton label="   Past    " tabName="Past"/>
        </View>
    );
}