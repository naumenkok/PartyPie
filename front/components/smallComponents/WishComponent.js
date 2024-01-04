import React, {useEffect, useState} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {eventPageStyle} from '../../styles/EventPageStyle';
import {COLORS} from "../../constants/theme";
import {getWishesByEventId} from "../../services/apiWishlist";
import Checkbox from 'expo-checkbox';
import {toggleStatusById} from '../../services/apiWishlist';
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";


export default function WishComponent({wish, setLoading, userId, screen}) {
    const [toggleCheckBox, setToggleCheckBox] = useState(wish.status && wish.status.data && wish.status.data[0] === 1);
    const handleLinkPress = (link) => {
        Linking.openURL(link);
        console.log(wish.status);
    };

    const toggleStatus = () => {
        console.log(userId);
        toggleStatusById(wish.wish_id, userId);
        setToggleCheckBox(!toggleCheckBox);
        setLoading(true);
    };

    return (
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             {screen === "Guest" ? (
                 <Checkbox
                     value={toggleCheckBox}
                     onValueChange={() => {
                         toggleStatus();
                     }}
                     color={toggleCheckBox ? COLORS.red : undefined}
                 />
             ):(<TouchableOpacity>
                     <FontAwesomeIcon icon={faPencil} size={35} style={{ color: COLORS.beaver }} />
                 </TouchableOpacity>)
             }
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
