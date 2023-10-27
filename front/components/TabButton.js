import React, {useState} from 'react';
import {View, TouchableOpacity, Text, } from 'react-native';
import { commonStyles } from '../styles/styles';
import {COLORS} from "../constants/theme";

export default function TabButton({label, tabName, activeTab, setActiveTab}) {
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


