import React, {useEffect, useState} from 'react';
import {Linking, Text, View} from 'react-native';
import {eventPageStyle} from '../styles/EventPageStyle';
import {COLORS} from "../constants/theme";
import {getWishesByEventId} from "../services/apiWishlist";
import Checkbox from 'expo-checkbox';
import {toggleStatusById} from '../services/apiWishlist';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function WishComponent({wish, setLoading, userId}) {
    const [toggleCheckBox, setToggleCheckBox] = useState(wish.status && wish.status.data && wish.status.data[0] === 1);
    const handleLinkPress = (link) => {
        Linking.openURL(link);
        console.log(wish.status);
    };

    const toggleStatus = () => {
        console.log(userId);
        toggleStatusById(wish.wish_id, userId);
        setToggleCheckBox(!toggleCheckBox);
        console.log('aaaaa');
        setLoading(true);
    };

    return (
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
                value={toggleCheckBox}
                onValueChange={() => {
                    toggleStatus();
                }}
                color={toggleCheckBox ? COLORS.red : undefined}
            />
             {wish.link && wish.link !== '' ? (<Text style={[eventPageStyle.textWishlist, {
                color: COLORS.pink,
                textDecorationLine: 'underline'
            }]} onPress={() => handleLinkPress(wish.link)}>
                {wish.name}
            </Text>):(
                     <Text style={[eventPageStyle.textWishlist, {color: COLORS.pink}]}>
                         {wish.name}
                     </Text>
                 )}
         </View>
    );
}
